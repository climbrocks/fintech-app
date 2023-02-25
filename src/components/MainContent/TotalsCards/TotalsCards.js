import React, {useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import { listTransactions, listAccounts } from "../../../graphql/queries";
import './TotalsCards.scss'

const TotalsCards = (props) => {
    
    //arrays to capture data pulled from transactions table and user info
    const [userDetails, setUser] = useState([]);
    const [transactions, setTransaction] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchTransactions();
        fetchUser();
        fetchAccounts();
      }, []);


    // constants to store account and user specific info
    const userAccount = [];
    const userAccountTypes = [];
    const userInfo = [];
    const userValues = [];

    // function to get individual user accounts
    function getUserAccounts(item) {
        if (item.cognitoID === userDetails.sub) {
            userAccount.push(item);
            userAccountTypes.push(item.accountType);
        }
    }


    // function to get user specific data
    function getUserTransaction(item){
        if (item.cognitoID === userDetails.sub){
        userInfo.push(item);
        userValues.push(item.value);
        }
    }
    const individualUserAccount = accounts.map(getUserAccounts);
    // variables to pull the user data
    let userTotal = 0;
    let userDebits = 0;
    const individualDetails = transactions.map(getUserTransaction);
    const individualTotal = userValues.forEach(getUserTotal);

    // function to total transactions for user
    function getUserTotal(num){
        userTotal += num;
        if (num < 0){
          userDebits += num;
        }
      }
    
    // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
        const user = await Auth.currentAuthenticatedUser();
        const userInfo = {"sub":user.attributes.sub, "username":user.username, "userInitial":user.username.slice(0, 1)};
        setUser(userInfo);
    }

    // function to get accounts
    async function fetchAccounts() {
        const getAccounts = await API.graphql({ query: listAccounts });
        const accFromAPI = getAccounts.data.listAccounts.items;
        setAccounts(accFromAPI);
    }

    // variables and constants to tally totals and store account names
    let loanTotal = 0;
    let creditTotal = 0;
    const loanAccounts = [];
    const creditAccounts = [];

    // function to get loan and credit card accounts
    function getCredLoanAccounts(account) {
        if (account.accountType == "credit card") {
            creditAccounts.push(account.bankName);
        }
        else if (account.accountType == "loan") {
            loanAccounts.push(account.bankName);
            
        }
    }

    // function to tally loan totals
    function getLoanTally(name){
        userInfo.forEach((item) => {
            if (item.bankName == name){
                loanTotal += item.value;
            }
        })
    }

    // function to tally credit total
    function getCreditTally(name){
        userInfo.forEach((item) => {
            if (item.bankName == name) {
                creditTotal += item.value;
            }
        })
    }

    // constants to call functions
    const getSpecialAccounts = userAccount.map(getCredLoanAccounts);
    const tallyLoans = loanAccounts.map(getLoanTally);
    const tallyCredit = creditAccounts.map(getCreditTally);
    
    
    // Function to fetch transaction data from DynamoDB table via Appsync API call
    async function fetchTransactions() {
        const getData = await API.graphql({ query: listTransactions });
        const tranFromAPI = getData.data.listTransactions.items;
        setTransaction(tranFromAPI);
    }
   
    //function to handle each total type and pass to display
    function handler(entry){
        if (entry == 'NET WORTH'){
            return userTotal.toLocaleString(undefined, {maximumFractionDigits:2})
        }
        else if (entry == 'SPENT'){
            return userDebits.toLocaleString(undefined, {maximumFractionDigits:2})
        }
        else if (entry == 'LOAN DEBT'){
            return loanTotal.toLocaleString(undefined, {maximumFractionDigits:2})
        }
        else if (entry == 'CREDIT DEBT'){
            return creditTotal.toLocaleString(undefined, {maximumFractionDigits:2})
        }
    }
    
    return (
        <div className='totals-card'>
            <div className="title">
                <p>Total</p>
                <h2>{ props.title }</h2>
            </div>
            <h2 className = 'amount'>${handler(props.title)}</h2>
    </div>
    );
};
export default TotalsCards;
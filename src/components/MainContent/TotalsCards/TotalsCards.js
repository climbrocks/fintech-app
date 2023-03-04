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


    const userAccount = [];
    const userAccountTypes = [];
    const userInfo = [];
    const userValues = [];

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

    async function fetchAccounts() {
        const getAccounts = await API.graphql({ query: listAccounts });
        const accFromAPI = getAccounts.data.listAccounts.items;
        setAccounts(accFromAPI);
    }

    let loanTotal = 0;
    let creditTotal = 0;
    const loanAccounts = [];
    const creditAccounts = [];

    function getCredLoanAccounts(account) {
        if (account.accountType == "credit card") {
            creditAccounts.push(account.bankName);
        }
        else if (account.accountType == "loan") {
            loanAccounts.push(account.bankName);
            
        }
    }

    function getLoanTally(name){
        userInfo.forEach((item) => {
            if (item.bankName == name){
                loanTotal += item.value;
            }
        })
    }

    function getCreditTally(name){
        userInfo.forEach((item) => {
            if (item.bankName == name) {
                creditTotal += item.value;
            }
        })
    }
    
    const getSpecialAccounts = userAccount.map(getCredLoanAccounts);
    const tallyLoans = loanAccounts.map(getLoanTally);
    const tallyCredit = creditAccounts.map(getCreditTally);
    
    
    // Function to fetch transaction data from DynamoDB table via Appsync API call
    async function fetchTransactions() {
        const getData = await API.graphql({ query: listTransactions });
        const tranFromAPI = getData.data.listTransactions.items;
        setTransaction(tranFromAPI);
    }
   
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
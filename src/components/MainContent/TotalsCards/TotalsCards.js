import React, {useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import { listTransactions } from "../../../graphql/queries";
import './TotalsCards.scss'

const TotalsCards = (props) => {
    
    //arrays to capture data pulled from transactions table and user info
    const [userDetails, setUser] = useState([]);
    const [transactions, setTransaction] = useState([]);

    useEffect(() => {
        fetchTransactions();
        fetchUser();
      }, []);

    // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
        const user = await Auth.currentAuthenticatedUser();
        const userInfo = {"sub":user.attributes.sub, "username":user.username, "userInitial":user.username.slice(0, 1)};
        setUser(userInfo);
    }

    // arrays to capture inidivual user data and
    // total value from DynamoDB
    const userInfo = [];
    const userValues = [];

    // function to get user specific data
    function getUserTransaction(item){
        if (item.cognitoID === userDetails.sub){
        userInfo.push(item);
        userValues.push(item.value);
        }
    }

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

    // Function to fetch transaction data from DynamoDB table via Appsync API call
    async function fetchTransactions() {
        const getData = await API.graphql({ query: listTransactions });
        const tranFromAPI = getData.data.listTransactions.items;
        setTransaction(tranFromAPI);
    }


    return (
        <div className='totals-card'>
            <div className="title">
                <p>Total</p>
                <h2>{ props.title }</h2>
            </div>
            <h2 className = 'amount'>${userTotal.toLocaleString(undefined, {maximumFractionDigits:2})}</h2>
        </div>
    );
};
export default TotalsCards;
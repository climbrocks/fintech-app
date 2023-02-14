import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import {
  Flex,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { listTransactions } from "../../../graphql/queries";
import {
  deleteTransaction as deleteTransactionMutation,
} from "../../../graphql/mutations";
import './TransactionsLine.scss';


const TransactionsLine = () => {

    // Constructors to capture logged in users and transactions
    const [userDetails, setUser] = useState([]);
    const [transactions, setTransaction] = useState([]);
    
  
    // Effect hook to dynamically update user & transactions
    useEffect(() => {
      fetchUser();
      fetchTransactions();
    }, []);
  
    // arrays to capture inidivual user data and 
    // total value from DynamoDB
    const userInfo = [];
    const userValues = [];
    const userAccount = [];
    const userAccountTypes = [];
  
    // function to get user specific data
    function getUserTransaction(item){
        let cnt = 0;
        while (cnt < 10){
            if (item.cognitoID === userDetails){
            userInfo.push(item);
            userValues.push(item.value);
            return item;
            }
            cnt++;
        }
    }
  
    // variables to pull the user data
    const individualDetails = transactions.map(getUserTransaction);
  
    // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
      const user = await Auth.currentAuthenticatedUser();
      const userInfo = user.attributes.sub
      setUser(userInfo);
    }
  
    // Function to fetch transaction data from DynamoDB table via Appsync API call
    async function fetchTransactions() {
      const getData = await API.graphql({ query: listTransactions });
      const tranFromAPI = getData.data.listTransactions.items;
      setTransaction(tranFromAPI);
    }
  
 
    // Function to delet a transaction will delete from DynamoDB table and refresh 
    async function deleteTransaction({ id, value }) {
      const newTransaction = transactions.filter((transaction) => transaction.id !== id);
      setTransaction(newTransaction);
      //await Storage.remove(name);
      await API.graphql({
        query: deleteTransactionMutation,
        variables: { input: { id } },
      });
    }

    //check to see if it was a Credit or Debit to return
    function checkDebit(item){
        if (item < 0){
            return "Debit"
        }
        else {
            return "Credit"
        }
    }
    
    return (
            <View >
             {userInfo
             .filter(transaction => transaction.cognitoID === userDetails)
             .map((transaction)=> (
               <Flex
                 key={transaction.id || transaction.value}
                 direction="row"
                 justifyContent={"space-between"}
                 className="transactions-line"
               >
                <Text className = 'transactions-title' fontWeight={700}>
                    {transaction.bankName}</Text>
                <Text className = 'transactions-type'>{checkDebit(transaction.value)}</Text>
                <Text className = 'transactions-amount' fontWeight={700}>
                   {transaction.value.toLocaleString(undefined, {maximumFractionDigits:2})}
                 </Text>

               </Flex>
            ))}
            </View>
    );
};
export default TransactionsLine;
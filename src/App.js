/*
** Main App 
** This originated as CMSC495 Final Project
** Date: Jan-Mar 2023
** Authors: Aaron G, Dalton C, Sean H, Chris T
*/
import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listAccounts, listTransactions } from "./graphql/queries";
import {
  createTransaction as createTransactionMutation,
  deleteTransaction as deleteTransactionMutation,
  createAccounts as createAccountMutation,
  updateAccounts as updateAccountMutation,
} from "./graphql/mutations";


const App = ({ signOut }) => {
//new
  // Constructors to capture logged in users and transactions
  const [userDetails, setUser] = useState([]);
  const [transactions, setTransaction] = useState([]);
  const [accounts, setAccounts] = useState([]);

  // Effect hook to dynamically update user & transactions
  useEffect(() => {
    fetchUser();
    fetchTransactions();
    fetchAccounts();
  }, []);

  // arrays to capture inidivual user data and 
  // total value from DynamoDB
  const userInfo = [];
  const userValues = [];

  // function to get user specific data
  function getUserTransaction(item){
    if (item.cognitoID === userDetails){
      userInfo.push(item);
      userValues.push(item.value);
      //return item;
    }
  }

  // variables to pull the user data
  let userTotal = 0
  const individualDetails = transactions.map(getUserTransaction);
  const individualTotal = userValues.forEach(getUserTotal);
  
  // function to total transactions for user
  function getUserTotal(num){
    userTotal += num;
  }
 
  // Function to fetch user UUID (sub) from AWS Cognito
  async function fetchUser() {
    const user = await Auth.currentAuthenticatedUser();
    const userInfo = user.attributes.sub
    setUser(userInfo);
    return userInfo;
  }

  async function fetchAccounts() {
    const getAccounts = await API.graphql({ query: listAccounts});
    const accFromAPI = getAccounts.data.listAccounts.items;
    setAccounts(accFromAPI);
  }

  // Function to fetch transaction data from DynamoDB table via Appsync API call
  async function fetchTransactions() {
    const getData = await API.graphql({ query: listTransactions });
    const tranFromAPI = getData.data.listTransactions.items;
    setTransaction(tranFromAPI);
  }

  async function createAccount(event){
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      institution: form.get("institution"),
      accountType: form.get("accountType"),
      cognitoID: userDetails,
    };
    await API.graphql({
      query: createAccountMutation,
      variables: { input: data },
    });
    fetchAccounts();
    event.target.reset();
  }   
  
  /* Function to add a new transaction 
     writes to DynamoDB table via Appsync 
     pulls data from user input form 
     calls refresh of transaction to display */
  async function createTransaction(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      value: form.get("value"),
      account: form.get("account"),
      cognitoID: userDetails,
    };
    await API.graphql({
      query: createTransactionMutation,
      variables: { input: data },
    });
    fetchTransactions();
    event.target.reset();
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

  async function updateAccount({ id, value}){
    const newAccount = accounts.filter((account) => account.id !== id);
    setAccounts(newAccount);
    await API.graphql({
      query: updateAccountMutation,
      variables: { input: {id, accountType: value}},
    })
  }
  
  //updateAccount("27bdeaac-7152-40cf-83d4-92a3ed282fab", "savings");
  //console.log(accounts);
  // Build display of form and data in web browser
  return (
    <View className="App">
      <Heading level={1}>NJORD</Heading>
      <View margin="3rem 0">
        <Flex direction="row" justifyContent="center">
          <Text as="strong" 
              fontSize={"2em"}
              fontStyle="oblique"
              color={"green"}>
            {userTotal}
          </Text>
          <Text fontSize={"2em"}>
            Net Worth
          </Text>
        </Flex>
      </View>
      <View as="form" margin="3rem 0" onSubmit={createAccount}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="institution"
            placeholder="Bank Name"
            label="institution"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="accountType"
            placeholder="Type (checking/savings/loan/etc)"
            label="accountType"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Add Account
          </Button>
        </Flex>
      </View>
      <View as="form" margin="3rem 0" onSubmit={createTransaction}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="value"
            placeholder="Transaction Amount"
            label="value"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="account"
            placeholder="Account"
            label="account"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Add Transaction
          </Button>
        </Flex>
      </View>
      <Heading level={2}>All Transactions</Heading>
      <View>
        {transactions
          .filter(transaction => transaction.cognitoID === userDetails)
          .map((transaction)=> (
            <Flex
              key={transaction.id || transaction.value}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text as="strong" fontWeight={700}>
                {transaction.value}
              </Text>
              <Text as="span">{transaction.account}</Text>
              <Text as="span">{transaction.createdAt}</Text>

             <Button variation="link" onClick={() => deleteTransaction(transaction)}>
                Delete Transaction
              </Button>
            </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
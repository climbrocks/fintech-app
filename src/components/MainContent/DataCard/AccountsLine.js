import './AccountsLine.scss';
import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import {
    Button,
    Flex,
    Text,
    View,
} from "@aws-amplify/ui-react";
import { listAccounts, listTransactions } from "../../../graphql/queries";
import {
    deleteAccounts as deleteAccountMutation,
    deleteTransaction as deleteTransactionMutation,
} from "../../../graphql/mutations";

const AccountsLine = () => {

    const [userDetails, setUser] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransaction] = useState([]);

    // Effect hook to dynamically update user & transactions
    useEffect(() => {
        fetchUser();
        fetchAccounts();
        fetchTransactions();
    }, []);

    // arrays to capture inidivual user data and 
    // total value from DynamoDB
    const userAccount = [];
    const userAccountTypes = [];
    const userInfo = [];

    function getUserAccounts(item) {
        if (item.cognitoID === userDetails) {
            userAccount.push(item);
            userAccountTypes.push(item.accountType);
        }
    }

    // function to get user specific data
    function getUserTransaction(item) {
      if (item.cognitoID === userDetails) {
        userInfo.push(item);
        return item;
      }
    }
    

    // variables to pull the user data
    const individualDetails = transactions.map(getUserTransaction);

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

    const individualUserAccount = accounts.map(getUserAccounts);

    // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
        const user = await Auth.currentAuthenticatedUser();
        const userInfo = user.attributes.sub
        setUser(userInfo);
        return userInfo;
    }

    async function fetchAccounts() {
        const getAccounts = await API.graphql({ query: listAccounts });
        const accFromAPI = getAccounts.data.listAccounts.items;
        setAccounts(accFromAPI);
    }

    async function deleteAccount({ id, value }) {
        let toDelete = userAccount.filter((account) => account.id == id);
        let name = toDelete[0].bankName;
        let iterTransactions = userInfo.filter((transaction) => transaction.bankName == name);
        let nowDelete = iterTransactions.map((deleteIt) => (
            deleteTransaction(deleteIt)
        ));
        const newAccount = accounts.filter((account) => account.id !== id);
        setAccounts(newAccount);
        await API.graphql({
            query: deleteAccountMutation,
            variables: { input: { id } },
        });
        window.location.reload();
    }
    
    function getCategories(type) {
        return (
            <View>
                {userAccount
                    .filter(account => account.accountType === type)
                    .map((account) => (
                        <Flex
                            key={account.id}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text as="strong" fontWeight={700}>
                                {account.bankName}
                            </Text>
                            <Text as="strong" >
                                {account.accountType}
                            </Text>
                            <Button variation='link' onClick={() => deleteAccount(account)}>
                                Delete
                            </Button>
                        </Flex>
                    ))}
            </View>
        );
    }

    return (
        <div>
            <div className='accounts'>
                <div className='account-type'>
                    <h4> Checking & Savings </h4>
                </div>
                <div className='line'>
                    {getCategories("checking")}
                    {getCategories("savings")}
                </div>
                <div className='account-type'>
                    <h4> Credit Cards </h4>
                </div>
                <div className='line'>
                    {getCategories("credit card")}
                </div>
                <div className='account-type'>
                    <h4> Loans </h4>
                </div>
                <div className='line'>
                    {getCategories("loan")}
                </div>
            </div>
        </div>
    );
};
export default AccountsLine;
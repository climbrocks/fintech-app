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
import { listAccounts } from "../../../graphql/queries";
import {
  deleteAccounts as deleteAccountMutation,
} from "../../../graphql/mutations";

const AccountsLine = () => {

    const [userDetails, setUser] = useState([]);
    const [accounts, setAccounts] = useState([]);

    // Effect hook to dynamically update user & transactions
    useEffect(() => {
      fetchUser();
      fetchAccounts();
    }, []);

    // arrays to capture inidivual user data and 
    // total value from DynamoDB
    const userAccount = [];
    const userAccountTypes = [];
    let userAccountID = "";
    let userAccontDict = {};

    function getUserAccounts(item){
      if (item.cognitoID === userDetails){
        userAccount.push(item);
        userAccountTypes.push(item.accountType);
        userAccontDict[item.institution] = item.accountType;
        //userAccountID = item.id;
      }
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
      const getAccounts = await API.graphql({ query: listAccounts});
      const accFromAPI = getAccounts.data.listAccounts.items;
      setAccounts(accFromAPI);
    }
    
    async function deleteAccount({id, value}){
        const newAccount = accounts.filter((account) => account.id !==id);
        setAccounts(newAccount);
        await API.graphql({
            query: deleteAccountMutation,
            variables: { input: { id } },
        });
    }
    
    function getCategories(type){
        return (
        <View>
        {userAccount
          .filter(account => account.accountType === type)
          .map((account)=> (
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
              <Button variation='link' onClick={() =>deleteAccount(account)}>
                Delete
              </Button>
            </Flex>
        ))}
      </View>
      );
    }

    return (
        <div>
            <div className = 'accounts'>
                <div className = 'account-type'>
                    <h4> Checking & Savings </h4>
                </div>
                {getCategories("checking")}
                {getCategories("savings")}
               <div className = 'account-type'>
                    <h4> Credit Cards </h4>
                </div>
                {getCategories("credit card")}
                <div className = 'account-type'>
                    <h4> Loans </h4>
                </div>
                {getCategories("loan")}
          </div>
      </div>
    );
};
export default AccountsLine;
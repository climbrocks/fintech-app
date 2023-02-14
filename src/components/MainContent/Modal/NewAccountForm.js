import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { listAccounts } from "../../../graphql/queries";
import {
    createAccounts as createAccountMutation,
  } from '../../../graphql/mutations';
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  SelectField,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import './NewAccountForm.scss';

const NewAccountForm = ({ closeModal }) => {

    // Constructors to capture logged in users and transactions
    const [userDetails, setUser] = useState([]);
    const [accounts, setAccounts] = useState([]);
  
    // Effect hook to dynamically update user & transactions
    useEffect(() => {
      fetchUser();
      fetchAccounts();
    }, []);
  
    // arrays to capture inidivual user data and 
    // total value from DynamoDB
    const userInfo = [];
    const userValues = [];
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
  
    function getAccountID(account) {
      if (account.institution === "Chase"){
        userAccountID = account.id;
      }    
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
  
   async function createAccount(event){
      event.preventDefault();
      const form = new FormData(event.target);
      const data = {
        bankName: form.get("bankName"),
        accountType: form.get("accountType"),
        //accountType: ["checking","savings","credit card"],
        cognitoID: userDetails,
      };
      await API.graphql({
        query: createAccountMutation,
        variables: { input: data },
      });
      fetchAccounts();
      event.target.reset();
      window.location.reload();
    }   
 

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='title-container'>
                    <h2>Add Account</h2>
                    <button className='exit-button' onClick={() => closeModal(false)}>X</button>
                </div>
                <View className='new-account-form' as="form" margin="3rem 0" onSubmit={createAccount}>
            <Flex direction="column" justifyContent="center">
                <TextField
                    name="bankName"
                    placeholder="Navy Federal"
                    labelHidden
                    variation="quiet"
                    required
                />
                <SelectField
                    name="accountType"
                    descriptiveText="Select Bank"
                    required
                >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="savings">Credit Card</option>
                    <option value="savings">Savings</option>
                </SelectField>
                <Button className='submit' type="submit">
                    Submit
                </Button>
            </Flex>
            </View>
            </div>
        </div>
    );
}
export default NewAccountForm;
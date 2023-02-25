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
  TextField,
  View,
  SelectField,
} from "@aws-amplify/ui-react";
import './NewAccountForm.scss';

const NewAccountForm = ({ closeModal }) => {

    // Constructors to capture logged in users and transactions
    const [userDetails, setUser] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [hasError, setHasError] = useState(true);
  
    // Effect hook to dynamically update user & transactions
    useEffect(() => {
      fetchUser();
      fetchAccounts();
    }, []);
  
    // arrays to capture inidivual user data and 
    // total value from DynamoDB
    const userAccount = [];
    const userAccountTypes = [];
  
  
   // Function to fetch user UUID (sub) from AWS Cognito
    async function fetchUser() {
      const user = await Auth.currentAuthenticatedUser();
      const userInfo = user.attributes.sub
      setUser(userInfo);
      return userInfo;
    }
 
    // function to get list of accounts
    async function fetchAccounts() {
      const getAccounts = await API.graphql({ query: listAccounts});
      const accFromAPI = getAccounts.data.listAccounts.items;
      setAccounts(accFromAPI);
    }
  
    // function to validate user input--only four digits allowed
    const validateNum = (e) => {
      const fourDigits = /^\d{4}$/.test(e.currentTarget.value);
      setHasError(!fourDigits);
    }


    // function to create account
    async function createAccount(event){
       event.preventDefault();
       const form = new FormData(event.target);
       const account = form.get("bankName")+" - "+form.get("lastFour");
       const data = {
         bankName: account,
         accountType: form.get("accountType"),
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
                    descriptiveText="Bank Name"
                    placeholder="Navy Federal"
                    variation="quiet"
                    required
                />
                <TextField
                    name="lastFour"
                    descriptiveText="Last 4 Account Digits"
                    placeholder="1234"
                    variation="quiet"
                    type="number"
                    required
                    hasError={hasError}
                    onChange={validateNum}
                    errorMessage="Please enter 4 digits"
                />
                <SelectField
                    name="accountType"
                    descriptiveText="Select Account Type"
                    required
                >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="credit card">Credit Card</option>
                    <option value="loan">Loan</option>
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
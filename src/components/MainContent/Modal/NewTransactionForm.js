import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { listTransactions } from "../../../graphql/queries";
import {
    createTransaction as createTransactionMutation,
  } from '../../../graphql/mutations';
import './NewTransactionForm.scss';
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

const NewTransactionForm = ({ closeModal }) => {


    // Constructors to capture logged in users and transactions
    const [userDetails, setUser] = useState([]);
    const [transactions, setTransaction] = useState([]);
    //const [accounts, setAccounts] = useState([]);

    // Effect hook to dynamically update user & transactions
    useEffect(() => {
      fetchUser();
      fetchTransactions();
      //fetchAccounts();
    }, []);

    // arrays to capture inidivual user data and 
    // total value from DynamoDB
    const userInfo = [];
    const userValues = [];
    //const userAccount = [];
    //const userAccountTypes = [];
    //let userAccountID = "";
    //let userAccontDict = {};

    // function to get user specific data
    function getUserTransaction(item){
      if (item.cognitoID === userDetails){
        userInfo.push(item);
        userValues.push(item.value);
      }
    }

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

    //updateAccountType();
    /* Function to add a new transaction 
     writes to DynamoDB table via Appsync 
     pulls data from user input form 
     calls refresh of transaction to display */
    async function createTransaction(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        let posNeg = 0;
        if (form.get("debcred") === "debit" ){
            posNeg = form.get("value") * -1;
            
        }
        else {
            posNeg = form.get("value");
        }
        const data = {
            value: posNeg,
            description: form.get("description"),
            bankName: form.get("bankName"),
            accountType: "checking",
            cognitoID: userDetails,
        };
        await API.graphql({
            query: createTransactionMutation,
            variables: { input: data },
        });
        fetchTransactions();
        event.target.reset();
        window.location.reload();
    }


    return (
        <div className='modal-background'>
        <div className='modal-container'>
            <div className='title-container'>
                <h2>Add Transaction</h2>
                <button className='exit-button' onClick={() => closeModal(false)}>X</button>
            </div>

            <View className='new-transaction-form' as="form" margin="3rem 0" onSubmit={createTransaction}>
            <Flex direction="column" justifyContent="center">
                <TextField
                    name="description"
                    placeholder="Description"
                    label="description"
                    labelHidden
                    variation="quiet"
                    required
                />
                <TextField
                    name="value"
                    placeholder="Transaction Amount"
                    label="value"
                    labelHidden
                    variation="quiet"
                    required
                />
                 <SelectField
                    name="debcred"
                    descriptiveText="Debit or Credit"
                    required
                >
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                </SelectField>
                <SelectField
                    name="bankName"
                    descriptiveText="Select Bank"
                    required
                >
                    <option value="Wells Fargo">Wells Fargo</option>
                    <option value="Navy Federal">Navy Federal</option>
                </SelectField>
                <Button className='submit' type="submit" >
                    Submit
                </Button>
            </Flex>
            </View>
            </div>
        </div>
    );
}
export default NewTransactionForm;
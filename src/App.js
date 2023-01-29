import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage, Auth } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listTodos, listTransactions } from "./graphql/queries";
import {
  createTodo as createNoteMutation,
  deleteTodo as deleteNoteMutation,
  createTransaction as createTransactionMutation,
  deleteTransaction as deleteTransactionMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [userDetails, setUser] = useState([]);
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    fetchNotes();
    fetchUser();
    fetchTransactions();
  }, []);

  async function fetchUser() {
    const user = await Auth.currentAuthenticatedUser();
    const userInfo = user.attributes.sub
    setUser(userInfo);
  }

  async function fetchTransactions() {
    const getData = await API.graphql({ query: listTransactions });
    const tranFromAPI = getData.data.listTransactions.items;
    //await Promise.all(
      //tranFromAPI.map(async (transaction) => {
        //return transaction;
     // })
    //);
    setTransaction(tranFromAPI)
  }
  //let attempt = fetchUser();
  //console.log(userDetails);

  async function createTransaction(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    //const image = form.get("image");
    const data = {
      value: form.get("value"),
      account: form.get("account"),
      //image: image.name,
      cognitoID: userDetails,
    };
    //if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createTransactionMutation,
      variables: { input: data },
    });
    fetchTransactions();
    event.target.reset();
  }

   async function deleteTransaction({ id, value }) {
    const newTransaction = transactions.filter((transaction) => transaction.id !== id);
    setTransaction(newTransaction);
    //await Storage.remove(name);
    await API.graphql({
      query: deleteTransactionMutation,
      variables: { input: { id } },
    });
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
      cognitoID: userDetails,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }
  

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }
 
  return (
    <View className="App">
      <Heading level={1}>NJORD</Heading>
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
      <View margin="3rem 0">
        {transactions.map((transaction) => (
          <Flex
            key={transaction.id || transaction.value}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {transaction.value}
            </Text>
            <Text as="span">{transaction.createdAt}</Text>
            <Text as="span">{transaction.account}</Text>

            <Button variation="link" onClick={() => deleteTransaction(transaction)}>
              Delete Transaction
            </Button>
          </Flex>
        ))}
      </View>
      <Heading level={2}>Returning logged in User transactions</Heading>
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
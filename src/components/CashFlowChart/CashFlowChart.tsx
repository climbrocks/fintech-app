import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { API, Auth } from "aws-amplify";
import { listAccounts, listTransactions } from "../../graphql/queries";

const CashFlowChart = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Cash Flow',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // arrays to capture Cognito IDs/accounts/transactions
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
  var item = "";

  // get user ID
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


  const individualUserAccount = accounts.map(getUserAccounts);

  // Function to fetch user UUID (sub) from AWS Cognito
  async function fetchUser() {
      const user = await Auth.currentAuthenticatedUser();
      const userInfo = user.attributes.sub
      setUser(userInfo);
      return userInfo;
  }

  // Get accounts
  async function fetchAccounts() {
      const getAccounts = await API.graphql({ query: listAccounts });
      const accFromAPI = getAccounts.data.listAccounts.items;
      setAccounts(accFromAPI);
  }
  
  const loanAccounts = [];
  const otherAccounts = [];

  function getCredLoanAccounts(account) {
    if (account.accountType == "loan") {
        loanAccounts.push(account.bankName);
    }
    else {
      otherAccounts.push(account.bankName);
    }
  }

  const getSpecialAccounts = userAccount.map(getCredLoanAccounts);

  const monthlySpent = {
    "January":[{"spent":0},{"income":0},{"loan":0}],
    "February":[{"spent":0},{"income":0},{"loan":0}],
    "March":[{"spent":0},{"income":0},{"loan":0}],
    "April":[{"spent":0},{"income":0},{"loan":0}],
    "May":[{"spent":0},{"income":0},{"loan":0}],
    "June":[{"spent":0},{"income":0},{"loan":0}],
  };

  const loanTransactions = [];
  const otherTransactions = [];

  function separateLoans(name){
    userInfo.forEach((item) => {
      if (item.bankName === name){
        loanTransactions.push(item)
      }
    });
  }
 
  function separateOthers(name){
    userInfo.forEach((item) => {
      if (item.bankName === name){
        otherTransactions.push(item)
      }
    });
  }
  
  const separateOther = otherAccounts.map(separateOthers);
  const separateLoan = loanAccounts.map(separateLoans);
  
  function getMonthlyData(){
    
    let valueSpent = 0;
    let valueIncome = 0;
    otherTransactions.forEach((tran) => {
      const month = tran.createdAt.substring(5,7);
      if (month == "01") {
        if (tran.value < 0){
          valueSpent += tran.value;
          monthlySpent["January"]["spent"] = valueSpent
        }
        else {
          valueIncome += tran.value;
          monthlySpent["January"]["income"] = valueIncome;
        }
      }
      if (month == "02") {
        if (tran.value < 0){
          valueSpent += tran.value;
          monthlySpent["February"]["spent"] = valueSpent;
          }
        else {
          valueIncome += tran.value;
          monthlySpent["February"]["income"] = valueIncome;
          }
      }
      if (month == "03") {
        if (tran.value < 0){
          valueSpent += tran.value;
          monthlySpent["March"]["spent"] = valueSpent
        }
        else {
          valueIncome += tran.value;
          monthlySpent["March"]["income"] = valueIncome;
        }
      } 
      if (month == "04") {
        if (tran.value < 0){
          valueSpent += tran.value;
          monthlySpent["April"]["spent"] = valueSpent
        }
        else {
          valueIncome += tran.value;
          monthlySpent["April"]["income"] = valueIncome;
        }
      }
      if (month == "05") {
        if (tran.value < 0){
          valueSpent += tran.value;
          monthlySpent["May"]["spent"] = valueSpent
        }
        else {
          valueIncome += tran.value;
          monthlySpent["May"]["income"] = valueIncome;
        }
      }
      if (month == "06") {
        if (tran.value < 0){
          valueSpent += tran.value;
          monthlySpent["June"]["spent"] = valueSpent
        }
        else {
          valueIncome += tran.value;
          monthlySpent["June"]["income"] = valueIncome;
        }
      }
    })
    
  }
  function getLoanData(){
    let valueLoan = 0;
    loanTransactions.forEach((tran) => {
      const month = tran.createdAt.substring(5,7);
      if (month == "01") {
        valueLoan += tran.value;
        monthlySpent["January"]["loan"] = valueLoan;
      }
      else if (month == "02") {
        valueLoan += tran.value;
        monthlySpent["February"]["loan"] = valueLoan;
      }
      else if (month == "03") {
        valueLoan += tran.value;
        monthlySpent["March"]["loan"] = valueLoan;
      } 
      else if (month == "04") {
        valueLoan += tran.value;
        monthlySpent["April"]["loan"] = valueLoan;
      }
      else if (month == "05") {
        valueLoan += tran.value;
        monthlySpent["May"]["loan"] = valueLoan;
      }
      else if (month == "06") {
        valueLoan += tran.value;
        monthlySpent["June"]["loan"] = valueLoan;
      }
    })
    
  }
  function getSpent(month){
    getMonthlyData();
    let ammount = monthlySpent[month]["spent"];
    if (ammount < 0){
      ammount = ammount * -1;
    }
    return ammount;
  }

  function getIncome(month){
    let ammount = monthlySpent[month]["income"];
    return ammount;
  }

  function getLoan(month){
    getLoanData();
    let ammount = monthlySpent[month]["loan"];
    ammount = ammount * -1;
    return ammount;
  }
  
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels,
    datasets: [
      {
        label: 'Spent',
        data: labels.map((months) => getSpent(months)),
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
      },
      {
        label: 'Income',
        data: labels.map((months) => getIncome(months)),
        backgroundColor: 'rgb(75, 192, 192)',
        stack: 'Stack 0',
      },
      {
        label: 'Loans',
        data: labels.map((months) => getLoan(months)),
        backgroundColor: 'rgb(53, 162, 235)',
        stack: 'Stack 1',
      },
    ],

  };
  return <Bar options={options} data={data} />;

};


export default CashFlowChart;
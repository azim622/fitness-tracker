import React, { useState, useEffect } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Balance = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [totalPaidMembers, setTotalPaidMembers] = useState(0);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await axiosSecure.get("/financial-overview");
        setTotalBalance(response.data.totalBalance);
        setTransactions(response.data.lastSixTransactions);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    const fetchSubscriptionData = async () => {
      try {
        const subscriberResponse = await axiosSecure.get("/newsLatter");
        setTotalSubscribers(subscriberResponse.data.length);  // Total number of subscribers
      } catch (error) {
        console.error("Error fetching subscriber data:", error);
      }
    };

    const fetchPaidMembersData = async () => {
      try {
        const paymentResponse = await axiosSecure.get("/all-payments");
        const paidMembers = paymentResponse.data.filter(payment => payment.price > 0);  // Filter payments with price > 0
        setTotalPaidMembers(paidMembers.length);  // Total number of paid members
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchFinancialData();
    fetchSubscriptionData();
    fetchPaidMembersData();
  }, [axiosSecure]);

  // Data for the chart
  const chartData = {
    labels: ['Newsletter Subscribers', 'Paid Members'],
    datasets: [
      {
        label: 'Total Subscribers vs Paid Members',
        data: [totalSubscribers, totalPaidMembers],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw + ' (' + Math.round((tooltipItem.raw / (totalSubscribers + totalPaidMembers)) * 100) + '%)';
          }
        }
      },
      datalabels: {
        display: true,
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = Math.round((value / total) * 100);
          return percentage + '%';
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 16
        },
        anchor: 'center',
        align: 'center',
      }
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <div className="container mx-auto px-6 py-12">

      <div className="flex">
        {/* Total Balance Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-1/2">
      <h1 className="text-2xl font-bold mb-6">Admin Financial Overview</h1>
          <h2 className="text-xl font-semibold mb-4">Total Balance</h2>
          <p className="text-2xl text-gray-700">${totalBalance}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-2 mb-2 w-1/2">
          <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers vs Paid Members</h2>
          <div className="relative" style={{ height: '300px' }}>
            <Pie data={chartData} options={options} />
          </div>
        </div>
      </div>

      {/* Last 6 Transactions Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Last 6 Transactions</h2>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="border-b py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{transaction.packageName}</p>
                  <p className="text-sm text-gray-500">
                    Trainer: {transaction.trainerName || "Unknown"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-emerald-500">
                    ${transaction.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleString()}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No transactions found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Balance;

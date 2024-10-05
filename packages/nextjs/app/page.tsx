"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { NextPage } from "next"
import { useAccount } from "wagmi"
import { BugAntIcon, MagnifyingGlassIcon, CubeIcon, DocumentTextIcon, ArrowUpIcon, ArrowDownIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { usePrivy } from '@privy-io/react-auth';
import { useAddPayment } from "../contracts/paymentManager"
import { SERVICE_CONSUMER_ID, SERVICE_PROVIDER_ID } from "~~/utils/scaffold-eth/constants"
export default function Home() {
  const { address: connectedAddress } = useAccount()
  const [popupContent, setPopupContent] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const { callAddPayment } = useAddPayment()

  const openPopup = (content: string) => {
    setPopupContent(content)
    setInputValue("")
    setIsPublic(false)
  }

  const closePopup = () => {
    setPopupContent(null)
  }

  const handleSubmit = () => {
    console.log("Submitted:", { inputValue, isPublic })
    closePopup()
  }

  const handleAddPayment = () => {
    callAddPayment(connectedAddress as `0x${string}`, "1")
  }


  return (
    <div className="flex items-center flex-col flex-grow pt-10 bg-white font-sans">
      <div className="px-5 w-full max-w-6xl">
        <h1 className="text-center text-blue-600">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
        </h1>
        <div className="mt-4 mb-8">
          <Image
            src="/placeholder.svg"
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full mx-auto border-4 border-blue-500"
          />
        </div>
      </div>
      <div className="flex-grow w-full mt-16 px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col bg-gray-50 p-10 text-center items-center rounded-3xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Farcaster Friends</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Profile 1"
                width={100}
                height={100}
                className="rounded-full border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Profile 2"
                width={100}
                height={100}
                className="rounded-full border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Profile 3"
                width={100}
                height={100}
                className="rounded-full border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Profile 4"
                width={100}
                height={100}
                className="rounded-full border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={() => openPopup("Farcaster Friends")}
            >
              View
            </button>
          </div>
          <div className="flex flex-col bg-gray-100 p-10 text-center items-center rounded-3xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">My NFTs</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Image
                src="/nft1.jpg"
                alt="Square 1"
                width={100}
                height={100}
                className="border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/nft2.jpg"
                alt="Square 2"
                width={100}
                height={100}
                className="border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/nft3.jpg"
                alt="Square 3"  
                width={100}
                height={100}
                className="border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/nft4.jpg"
                alt="Square 4"
                width={100}
                height={100}
                className="border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={() => openPopup("My NFTs")}
            >
              View
            </button>
          </div>
          
          {connectedAddress &&  connectedAddress == SERVICE_PROVIDER_ID &&(
            <>
              <div className="flex flex-col bg-gray-200 p-10 text-center items-center rounded-3xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Finance (private)</h3>
                <div className="w-full space-y-4 mb-6">
                  {[
                    { type: "in", description: "Salary Deposit", amount: "+$3,500.00" },
                    { type: "out", description: "Rent Payment", amount: "-$1,200.00" },
                    { type: "in", description: "Freelance Work", amount: "+$800.00" },
                    { type: "out", description: "Grocery Shopping", amount: "-$150.00" },
                    { type: "out", description: "Utility Bills", amount: "-$200.00" },
                    { type: "in", description: "Investment Dividend", amount: "+$75.00" },
                    { type: "out", description: "Online Shopping", amount: "-$89.99" },
                    { type: "in", description: "Tax Refund", amount: "+$350.00" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-300 pb-2 hover:bg-gray-300 transition-colors duration-300 ease-in-out rounded px-2">
                      <div className="flex items-center">
                        {transaction.type === "in" ? (
                          <ArrowDownIcon className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <ArrowUpIcon className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span className="text-gray-700">{transaction.description}</span>
                      </div>
                      <span className={`font-semibold ${transaction.type === "in" ? "text-green-500" : "text-red-500"}`}>
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => handleAddPayment() /**openPopup("Finance (private)")**/}
                >
                  Create payment link
                </button>
              </div>
              
              <div className="flex flex-col bg-gray-150 p-10 text-center items-center rounded-3xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">My Subscriptions (private)</h3>
                <div className="w-full space-y-4 mb-6">
                  {[
                    { name: "Netflix", amount: "$12.99" },
                    { name: "Spotify", amount: "$9.99" },
                    { name: "Amazon Prime", amount: "$14.99" },
                    { name: "GitHub Pro", amount: "$7.99" },
                  ].map((subscription, index) => (
                    <div key={index} className="flex items-center space-x-4 border-b border-gray-300 pb-4 hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded px-2">
                      <Image
                        src={`/placeholder.svg?height=50&width=50&text=${subscription.name[0]}`}
                        alt={subscription.name}
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                      <div className="flex-grow text-left">
                        <p className="text-blue-600 font-semibold">{subscription.name}</p>
                        <p className="text-gray-700 text-sm">Monthly subscription</p>
                      </div>
                      <p className="text-gray-700 font-bold">{subscription.amount}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => openPopup("My Subscriptions (private)")}
                >
                  View
                </button>
              </div>
            </>
          )}

          {SERVICE_CONSUMER_ID &&(
            <>
             
              <div className="flex flex-col bg-gray-150 p-10 text-center items-center rounded-3xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">My Services</h3>
                <div className="w-full space-y-4 mb-6">
                  {[
                    { name: "English lessons", amount: "$7.99" },
                  ].map((subscription, index) => (
                    <div key={index} className="flex items-center space-x-4 border-b border-gray-300 pb-4 hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded px-2">
                      <Image
                        src={`/placeholder.svg?height=50&width=50&text=${subscription.name[0]}`}
                        alt={subscription.name}
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                      <div className="flex-grow text-left">
                        <p className="text-blue-600 font-semibold">{subscription.name}</p>
                        <p className="text-gray-700 text-sm">Monthly subscription</p>
                      </div>
                      <p className="text-gray-700 font-bold">{subscription.amount}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => openPopup("My Subscriptions (private)")}
                >
                  View
                </button>
              </div>
            </>
          )}
          
        </div>
      </div>

      {popupContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">{popupContent}</h2>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="characterInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Insert characters:
                </label>
                <input
                  type="text"
                  id="characterInput"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter characters here"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Private</span>
                <label htmlFor="publicPrivateSwitch" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="publicPrivateSwitch"
                      className="sr-only"
                      checked={isPublic}
                      onChange={() => setIsPublic(!isPublic)}
                    />
                    <div className={`block w-14 h-8 rounded-full ${isPublic ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isPublic ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
                <span className="text-sm font-medium text-gray-700">Public</span>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { useAccount } from "wagmi"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Address } from "~~/components/scaffold-eth"

interface Subscription {
  name: string;
  amount: string;
}

export default function Home() {
  const { address: connectedAddress } = useAccount()
  const [popupContent, setPopupContent] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)

  const openPopup = (content: string) => {
    setPopupContent(content)
    setInputValue("")
    setIsPublic(false)
  }

  const closePopup = () => {
    setPopupContent(null)
    setSelectedSubscription(null)
  }

  const handleSubmit = () => {
    console.log("Submitted:", { inputValue, isPublic, selectedSubscription })
    closePopup()
  }

  const subscriptions: Subscription[] = [
    { name: "Netflix", amount: "$12.99" },
    { name: "Spotify", amount: "$9.99" },
    { name: "Amazon Prime", amount: "$14.99" },
    { name: "GitHub Pro", amount: "$7.99" },
  ]

  const openSubscriptionPopup = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setPopupContent("Subscription Details")
  }

  return (
    <div className="flex items-center flex-col flex-grow bg-white font-sans">
      <div className="w-full max-w-6xl mb-16">
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white text-center z-10">Scaffold-ETH 2</h1>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <Image
              src="/placeholder.svg"
              alt="Profile Picture"
              width={180}
              height={180}
              className="rounded-full border-4 border-white"
            />
          </div>
        </div>
        <div className="bg-white pt-24 pb-10 rounded-3xl shadow-lg -mt-12">
          <p className="text-xl text-center text-gray-600 mt-4">Building the future of Ethereum</p>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <p className="font-medium text-gray-700">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>
      </div>

      <div className="flex-grow w-full mt-16 px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col bg-gray-50 p-10 text-center items-center rounded-3xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-black mb-4">Farcaster Friends</h3>
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
            <h3 className="text-2xl font-bold text-black mb-4">My NFTs</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Square 1"
                width={100}
                height={100}
                className="border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Square 2"
                width={100}
                height={100}
                className="border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Square 3"
                width={100}
                height={100}
                className="border-2 border-blue-500 transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <Image
                src="/placeholder.svg?height=100&width=100"
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
          <div className="flex flex-col bg-gray-150 p-10 text-center items-center rounded-3xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-black mb-4">My Subscriptions</h3>
            <div className="w-full space-y-4 mb-6">
              {subscriptions.map((subscription, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 border-b border-gray-300 pb-4 hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded px-2 cursor-pointer"
                  onClick={() => openSubscriptionPopup(subscription)}
                >
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
              onClick={() => openPopup("My Subscriptions")}
            >
              View All
            </button>
          </div>
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
              {selectedSubscription ? (
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedSubscription.name}</h3>
                  <p className="text-gray-600">Monthly subscription: {selectedSubscription.amount}</p>
                </div>
              ) : (
                <>
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
                </>
              )}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {selectedSubscription ? "Close" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

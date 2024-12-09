'use client'
import 'dotenv/config'
import { useState } from 'react'

const apiKeyBrian = process.env.NEXT_PUBLIC_BRIAN_API_KEY ?? ''
const url = 'https://api.brianknows.org/api/v0/agent/smart-contract'

export default function Home() {
  const [contractGenerated, setContractGenerated] = useState<ContractProps>()
  const [prompt, setPrompt] = useState('')

  const contractGenerator = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Brian-Api-Key': apiKeyBrian,
      },
      body: JSON.stringify({
        prompt: prompt,
        compile: false,
        message: [
          {
            sender: 'user',
            content: '',
          },
        ],
      }),
    }

    try {
      const response = await fetch(url, options)
      const data: ContractProps = await response.json()
      console.info(data)
      setContractGenerated(data)
    } catch (error) {
      console.info(error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-3xl">Mentoria</h1>
      <input
        type="text"
        onChange={(e) => setPrompt(e.target.value)}
        className="px-3 py-2 rounded-sm border border-gray-300"
      />
      <button
        onClick={contractGenerator}
        className="px-3 py-2 bg-green-300 rounded-sm"
      >
        Generate contract
      </button>
      {contractGenerated ? (
        <>
          <h2>{contractGenerated.result.contractName}</h2>
          <pre>{contractGenerated.result.contract}</pre>
        </>
      ) : null}
    </div>
  )
}

interface ContractProps {
  result: {
    contract: string
    contractName: string
  }
}

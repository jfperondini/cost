/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { fetchGet } from '@/service/fecthData'
import { CircularProgress, FormControl, MenuItem, Select } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa'

export default function Home () {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [sortedResults, setSortedResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('alphabetical')

  useEffect(() => {
    const sortResults = () => {
      let sorted = [...results]

      if (sortBy === 'alphabetical') {
        sorted.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortBy === 'priceAsc') {
        sorted.sort((a, b) => a.price - b.price)
      } else if (sortBy === 'priceDesc') {
        sorted.sort((a, b) => b.price - a.price)
      }

      setSortedResults(sorted)
    }

    sortResults()
  }, [sortBy, results])

  const handleSubmit = async event => {
    event.preventDefault()
    //console.time('handleSubmit')
    try {
      if (searchQuery.trim()) {
        setLoading(true)
        const result = await fetchGet(searchQuery)
        setResults(result)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
      //console.timeEnd('handleSubmit')
    }
  }

  const handleSortChange = event => {
    setSortBy(event.target.value)
  }

  return (
    <>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg flex items-center gap-4'>
            <CircularProgress size='2em' color='#F59E0B' />
            <p className='text-gray-700 font-medium text-lg'>
              Aguarde, estamos processando os dados...
            </p>
          </div>
        </div>
      )}

      <header className='bg-gray-700 text-white py-6 shadow-md'>
        <div className='container mx-auto flex items-center justify-center space-x-24'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-2xl font-mono font-extrabold'>Bom Preço</h1>
            
            <FaShoppingCart size='2em' color='#F59E0B' />
          </div>

          <form className='flex w-full max-w-md' onSubmit={handleSubmit}>
            <input
              type='text'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Digite o nome do produto'
              className='px-4 py-2 font-mono  border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 s flex-1 text-black'
            />
            <button
              type='button'
              onClick={() => {
                setSearchQuery('')
                setResults([])
              }}
              className='bg-white text-black font-mono px-3 py-2   hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center'
            >
              x
            </button>
            <button
              type='submit'
              className='bg-white text-black font-mono px-4 py-2 rounded-r-lg font-bold hover:bg-white transition-colors duration-300 flex items-center'
              
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 68 64'
                className='w-4 h-4'
                fill='currentColor'
              >
                <g id='icon'>
                  <path d='M28.946 57.611c-15.936 0-28.9-12.921-28.9-28.807S13.01 0 28.946 0c15.936 0 28.9 12.921 28.9 28.804s-12.964 28.807-28.9 28.807zm0-48.516c-10.901 0-19.772 8.843-19.772 19.708s8.871 19.708 19.772 19.708c10.901 0 19.772-8.843 19.772-19.708S39.85 9.095 28.946 9.095z'></path>
                  <path d='M61.102 64.032 45.984 48.96l6.453-6.432L67.555 57.6l-6.453 6.432z'></path>
                </g>
              </svg>
            </button>
          </form>
        </div>
      </header>
      <main className='flex min-h-screen flex-col items-center sm:p-6 md:p-6 lg:p-6'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-4'>
            <h1 className='text-gray-800 font-mono text-sm'>
              Mais de {results.length} resultados
            </h1>
            <h1 className='text-gray-800 font-mono text-sm'> | </h1>
            <FormControl variant='outlined' size='small'>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                className='w-48 custom-select text-gray-800 font-mono'
              >
                <MenuItem
                  className='text-gray-800 font-mono text-sm'
                  value='alphabetical'
                >
                  Nome (A-Z)
                </MenuItem>
                <MenuItem
                  className='text-gray-800 font-mono text-sm'
                  value='priceAsc'
                >
                  Menor preço
                </MenuItem>
                <MenuItem
                  className='text-gray-800 font-mono text-sm'
                  value='priceDesc'
                >
                  Maior preço
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='mt-6'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
            {sortedResults.map((item, index) => (
              <li
                key={index}
                className='bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md p-3'
              >
                <div className='flex flex-col items-center'>
                  <img
                    src={item.img}
                    className='w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-md'
                    alt={item.name}
                  />
                  <h1 className='text-gray-800 font-semibold text-lg mt-2'>
                    R$ {item.price}
                  </h1>
                  <h3 className='text-gray-700 font-medium text-sm'>
                    {item.name}
                  </h3>
                  <div className='mt-2'>
                    <img
                      src={item.logo}
                      className='w-34 h-20'
                      alt={item.market}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

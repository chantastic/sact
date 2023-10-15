'use client'

import * as React from 'react'

type Manner = 'solo' | 'partner' | 'unknown' | null

let initialEvacuations: Manner[] = Array(19).fill(null)

export default function Home() {
  let [evacuations, updateEvacuations] = React.useState(initialEvacuations)

  function addNextEvacuation(manner: Manner) {
    let nextEvacuation = evacuations.findIndex((element) => element === null)

    updateEvacuations((evacuations) => {
      let newEvacuations = [...evacuations]
      newEvacuations[nextEvacuation] = manner

      return newEvacuations
    })
  }

  function evacuationsRemaining(evacuations: Manner[]) {
    return evacuations.filter((e) => e === null).length + 1
  }

  function getMannerStatement(manner: Manner) {
    switch (manner) {
      case 'solo':
        return `Completed solo.`
      case 'partner':
        return `Completed with a partner.`
      case 'partner':
        return `Completed with in shame.`
      case null:
        return `Incomplete.`
    }
  }

  function getMannerEmoji(manner: Manner) {
    switch (manner) {
      case 'solo':
        return '✊'
      case 'partner':
        return '😘'
      case 'unknown':
        return '🫣'
      default:
        return '⚪️'
    }
  }
  return (
    <>
      <header className='flex justify-center text-4xl'>Sact 🍒</header>
      <main className='flex portrait:flex-col landscape:flex-row h-full mt-8 justify-around'>
        <div className='flex justify-center'>
          <ol className='grid justify-items-center items-center grid-cols-5 grid-rows-4 max-h-[12rem] max-w-[16rem]'>
            {evacuations.map((evacuation: Manner, i: number) => {
              return (
                <li
                  key={i}
                  aria-label={`Evacuation ${i + 1} of 20. ${getMannerStatement(
                    evacuation
                  )}`}
                >
                  <span className={evacuation ? `text-4xl` : 'text-sm'}>
                    {getMannerEmoji(evacuation)}
                  </span>
                </li>
              )
            })}
            <li key='final'>
              <span
                className='text-6xl'
                aria-label='Final evacuation. Capture and deliver to lab.'
              >
                🧪
              </span>
            </li>
          </ol>
        </div>
        <div className='flex flex-col'>
          <>
            <p className='flex justify-center py-8 text-2xl'>
              Only {evacuationsRemaining(evacuations)} left!
            </p>
            <div className='flex flex-row justify-center text-6xl width-full gap-4'>
              <button
                aria-label='Complete evacuation, with partner.'
                onClick={() => addNextEvacuation('solo')}
              >
                ✊
              </button>
              <button
                aria-label='Complete evacuation, with partner.'
                onClick={() => addNextEvacuation('partner')}
              >
                😘
              </button>
              <button
                aria-label='Complete evacuation, prefer not to say.'
                onClick={() => addNextEvacuation('unknown')}
              >
                🫣
              </button>
            </div>
          </>
        </div>
      </main>
    </>
  )
}

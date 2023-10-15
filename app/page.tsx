'use client'

import * as React from 'react'
import JSConfetti from 'js-confetti'
/* @ts-ignore */
import { useAriaLive, PoliteAriaLive } from 'use-aria-live'
import { UserButton } from '@clerk/nextjs'

type Manner = 'solo' | 'partner' | 'unknown' | null

let initialEvacuations: Manner[] = Array(19).fill(null)

export default function Home() {
  let [evacuations, updateEvacuations] = React.useState(initialEvacuations)

  let [politeAnnouncement, announcePolitely] = useAriaLive()

  React.useEffect(() => {
    if (evacuationsRemaining(evacuations) > 1) return

    announcePolitely(
      'Great job! Collect this sample and get your ass to the lab within 60 minutes.'
    )

    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
      confettiColors: [
        '#ff0a54',
        '#ff477e',
        '#ff7096',
        '#ff85a1',
        '#fbb1bd',
        '#f9bec7',
      ],
      confettiRadius: 6,
    })

    return () => {
      jsConfetti.clearCanvas()
    }
  }, [evacuations, announcePolitely])

  function addNextEvacuation(manner: Manner) {
    let nextEvacuation = evacuations.findIndex((element) => element === null)

    announcePolitely(
      `Evacuation ${nextEvacuation + 1} of 20 was tracked as ${manner}.`
    )

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
      case 'unknown':
        return `Completed in shame.`
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
      <header className='flex text-4xl justify-center relative'>
        <span>Sact 🍒</span>

        <span className='absolute right-0 top-1'>
          <UserButton afterSignOutUrl='/' />
        </span>
      </header>
      <main className='flex portrait:flex-col landscape:flex-row h-full mt-8 justify-around'>
        {evacuationsRemaining(evacuations) > 1 ? (
          <>
            <div className='flex justify-center'>
              <ol className='grid justify-items-center items-center grid-cols-5 grid-rows-4 max-h-[12rem] max-w-[16rem]'>
                {evacuations.map((evacuation: Manner, i: number) => {
                  return (
                    <li
                      key={i}
                      aria-label={`Evacuation ${
                        i + 1
                      } of 20. ${getMannerStatement(evacuation)}`}
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
          </>
        ) : (
          <div className='flex portrait:flex-col landscape:flex-row align-center justify-center'>
            <div className='flex flex-col gap-8 text-center'>
              <p className='text-4xl'>Great job!</p>
              <p className='text-lg opacity-60 px-6 landscape:mx-8'>
                Collect this sample and get your ass to the lab within 60
                minutes.
              </p>
              <p className='text-4xl'>💦🧪⏰🧑‍🔬🔬📉</p>
            </div>

            <div className='portrait:mt-12'>
              <table className='w-full text-sm text-left'>
                <thead className='text-xs uppercase'>
                  <tr className='opacity-40'>
                    <th className='px-6 py-3'>Manner</th>
                    <th className='px-6 py-3 text-center'>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(
                    evacuations.reduce(
                      (acc, item) => ({
                        ...acc,
                        [String(item)]: Number(acc[String(item)]) + 1,
                      }),
                      { solo: 0, partner: 0, unknown: 0 }
                    )
                  ).map(([k, v]) => (
                    <tr key={k} className='border-b '>
                      <td className='px-6 py-4 font-medium whitespace-nowrap opacity-60'>
                        <span className='mr-2'>
                          {getMannerEmoji(String(k))}
                        </span>
                        <span>
                          {String(k) === 'unknown' ? 'prefer not to say' : k}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <PoliteAriaLive>{politeAnnouncement}</PoliteAriaLive>
    </>
  )
}

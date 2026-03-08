"use client"

import Accordian from "../ui/accordian"
import { workSamples } from "../"

export default function WorkSamples(){

  return (
    <>
      <div>
        <h1>Work Samples</h1>
      </div>

      <div className="h-256">
        {workSamples.map((sample, i) => (
          <Accordian
            key={i}
            title={sample.title}
            text={sample.text}
          />
        ))}
      </div>
    </>
  )
}
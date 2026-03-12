"use client"

import Accordian from "../ui/accordian"
import { workSamples } from "../../app/data/workSamples"

export default function WorkSamples(){

  return (
    <>
      <div className=" text-7xl mx-44 ">
            <h1>Writing Samples</h1>
      </div>

      <div className="space-y-6 mx-44">
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
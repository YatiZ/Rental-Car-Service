'use client'
import React from 'react'
import {motion, AnimatePresence} from "framer-motion";
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const containerVarients = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      trasition: {
        type: "spring",
        mass: 0.4,
        damping: 8,
        when: "afterChildren",
        stagger: 0.4,
      },
    },
    exit:{
      x: '-100vh',
      transition: {ease: 'easeInOut'}
    }
  };
const QApage = () => {
  return (
    <AnimatePresence>
    <motion.div variants={containerVarients} initial='hidden' animate='visible' exit='exit'>QApage
        <Card>
          <CardHeader>General Queries</CardHeader>
          <CardContent className=''>
          <div className="accordion">
        <div className="accordion-item" id="question1">
          <a className="accordion-link" href="#question1">
            <div className="flex">
              <h3>BRANDING</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"></i>
            <i className="icon ion-md-arrow-down"></i>
          </a>
          <div className="answer">
            <p> We believe in the greater good, we strive to do something for people, we aim to make their lives easier and more enjoyable, we love businesses that keep this</p>
          </div>
          <hr/>
      </div>
        <div className="accordion-item" id="question2">
          <a className="accordion-link" href="#question2">
            <div className="flex">
              <h3>UX/UI DESIGN</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"></i>
            <i className="icon ion-md-arrow-down"></i>
          </a>
          <div className="answer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          </div>
          <hr/>
      </div>
        <div className="accordion-item" id="question3">
          <a className="accordion-link" href="#question3">
            <div className="flex">
              <h3>FRONTEND DEVELOPMENT</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"></i>
            <i className="icon ion-md-arrow-down"></i>
          </a>
          <div className="answer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          </div>
          <hr/>
      </div>
        <div className="accordion-item" id="question4">
          <a className="accordion-link" href="#question4">
            <div>
              <h3>BACKEND DEVELOPMENT</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"></i>
            <i className="icon ion-md-arrow-down"></i>
          </a>
          <div className="answer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          </div>
          <hr/>
      </div>
     </div>
          </CardContent>
        </Card>
    </motion.div>
    </AnimatePresence>
  )
}

export default QApage
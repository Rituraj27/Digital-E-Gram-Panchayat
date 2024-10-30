import React from 'react'
import about from './../../assets/aboutus.png';

const About = () => {
  return (
    <div className=' text-black px-[5vw] py-4'>
      <h1 className='text-3xl'>DigitalGramSwaraj</h1>
      <p>To strengthen e-Governance in Panchayati Raj Institutions (PRIs) across the country, Ministry of Panchayati Raj (MoPR) has launched DigitalGramSwaraj, a user friendly web-based portal. DigitalGramSwaraj aims to bring in better transparency in the decentralised planning, progress reporting and work-based accounting.</p>
      <p>DigitalGramSwaraj application has been monumental in bringing together a tech-based, integrated system of information gathering, micro level planning, work-based accounting for last tier of local self-government called Panchayats. The application has a user base of more than 2.7 Lakh PRIs; spread across 28 States and 6 UTs. The application has been ever evolving because of the continuous feedback from various critical stakeholders such as State officials, end users at Gram Panchayat level, Ministry of Panchayati Raj and National Informatics Centre.</p>
      <img src={about} alt="" className='mx-auto' />
      <h1>Objective</h1>
      <p>Based on the inputs received from various stakeholders, Ministry of Panchayati Raj (MoPR) is of the opinion that a technical and functional refresh of the DigitalGramSwaraj application is imperative. The intended objective is to enhance the application with latest technical advancements and EmergingTech integrations as per suitability. On the functional front, design of new Key Performance Indicators (KPIs) and Process Reengineering shall be focused upon. To gain a better understanding of Industry and Sector level best practices, a symposium of experts from across the nation shall be organized.</p>
      
    </div>
  )
}

export default About

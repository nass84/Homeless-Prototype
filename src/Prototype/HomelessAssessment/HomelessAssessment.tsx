import React, { useState, useEffect, useRef } from 'react'
import { PageTemplate } from '../../components/PageTemplate/PageTemplate.js'
import { TextInput } from '../../components/TextInput/TextInput.js'
import { DateInput } from '../../components/DateInput/DateInput.js'
import { Radios } from '../../components/Radios/Radios.js'
import { Checkboxes } from '../../components/Checkboxes/Checkboxes.js'
import { Textarea } from '../../components/Textarea/Textarea.js'
import { Button } from '../../components/Button/Button.js'
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup.js'
import { Fieldset } from '../../components/Fieldset/Fieldset.js'
import { ErrorSummary } from '../../components/ErrorSummary/ErrorSummary.js'
import { InsetText } from '../../components/InsetText/InsetText.js'
import { Details } from '../../components/Details/Details.js'
import { WarningText } from '../../components/WarningText/WarningText.js'
import { Heading } from '../../components/Heading/Heading.js'
import { NotificationBanner } from '../../components/NotificationBanner/NotificationBanner.js'
import { SummaryList } from '../../components/SummaryList/SummaryList.js'
import housing1 from './images/housing1.jpg'
import housing2 from './images/housing2.jpg'
import housing3 from './images/housing3.jpg'
import housing4 from './images/housing4.jpg'
import housing5 from './images/housing5.jpg'
import housing6 from './images/housing6.jpg'

export interface HomelessAssessmentProps {
  /**
   * Service name to display in the header
   */
  serviceName?: string
  /**
   * Callback when form is submitted
   */
  onSubmit?: (data: HomelessAssessmentData) => void
  /**
   * Whether to show the interview guidance feature
   */
  showInterviewGuidance?: boolean
}

export interface HomelessAssessmentData {
  personalDetails: {
    firstName: string
    lastName: string
    dateOfBirth: { day: string; month: string; year: string }
    phoneNumber: string
    email: string
  }
  housingSituation: {
    currentAccommodation: string
    accommodationDetails: string
    durationAtAddress: string
    reasonForHomelessness: string
  }
  supportNeeds: {
    needs: string[]
    needsDetails: string
  }
  priorityNeeds: {
    hasDependentChildren: string
    numberOfChildren?: string
    isPregnant: string
    hasPhysicalDisability: string
    hasMentalHealthCondition: string
    isDomesticViolenceVictim: string
    isYoungPersonAtRisk: string
    additionalDetails: string
  }
}

export const HomelessAssessment: React.FC<HomelessAssessmentProps> = ({
  serviceName = 'Homelessness Services',
  onSubmit,
  showInterviewGuidance = true,
}) => {
  const [errors, setErrors] = useState<Array<{ target: string; message: string }>>([])
  const [showChildren, setShowChildren] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const [currentView, setCurrentView] = useState<'guidance' | 'recording' | 'formEntry' | 'form' | 'loading' | 'results' | 'confirmation'>('guidance')
  const [formData, setFormData] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0)
  const [checkedQuestions, setCheckedQuestions] = useState<{ [key: string]: boolean }>({})
  const [recordingStep, setRecordingStep] = useState(1)
  const [formStep, setFormStep] = useState(1)
  const [translateMode, setTranslateMode] = useState(false)
  const [translateLanguage, setTranslateLanguage] = useState('')
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  const translateLanguages = [
    { code: 'ar-SA', label: 'Arabic' },
    { code: 'bn-BD', label: 'Bengali' },
    { code: 'zh-CN', label: 'Chinese (Mandarin)' },
    { code: 'cs-CZ', label: 'Czech' },
    { code: 'fa-IR', label: 'Farsi' },
    { code: 'fr-FR', label: 'French' },
    { code: 'gu-IN', label: 'Gujarati' },
    { code: 'hi-IN', label: 'Hindi' },
    { code: 'ku', label: 'Kurdish' },
    { code: 'lt-LT', label: 'Lithuanian' },
    { code: 'pl-PL', label: 'Polish' },
    { code: 'pt-PT', label: 'Portuguese' },
    { code: 'pa-IN', label: 'Punjabi' },
    { code: 'ro-RO', label: 'Romanian' },
    { code: 'ru-RU', label: 'Russian' },
    { code: 'so-SO', label: 'Somali' },
    { code: 'es-ES', label: 'Spanish' },
    { code: 'sw-KE', label: 'Swahili' },
    { code: 'ta-IN', label: 'Tamil' },
    { code: 'ti-ER', label: 'Tigrinya' },
    { code: 'tr-TR', label: 'Turkish' },
    { code: 'uk-UA', label: 'Ukrainian' },
    { code: 'ur-PK', label: 'Urdu' },
    { code: 'vi-VN', label: 'Vietnamese' },
  ]
  const [formFields, setFormFields] = useState<{ [key: string]: string }>({})

  const updateFormField = (field: string, value: string) => {
    setFormFields(prev => ({ ...prev, [field]: value }))
  }
  const recognitionRef = useRef<any>(null)

  // Step titles for progress indicator
  const stepTitles = [
    'Identity and contact details',
    'Household composition',
    'When accommodation is needed',
    'Location constraints',
    'Health and medical needs',
    'Risk and safeguarding',
    'Support needs',
    'Legal eligibility',
    'Practical considerations'
  ]

  // Scroll to top when view or step changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentView, recordingStep, formStep])

  // Array of property images and details
  const properties = [
    {
      image: housing1,
      name: 'Riverside Temporary Housing',
      address: 'Flat 3, Riverside Building\n45 River Street\nLondon\nSW1A 2AA',
      propertyType: 'Self-contained studio flat',
      availableFrom: 'Today',
      facilities: [
        'Private kitchen and bathroom',
        'Furnished',
        'Heating included',
        'Ground floor access (suitable for limited mobility)',
        'On-site support worker available',
      ],
      transport: [
        '5 minute walk to bus stop',
        '10 minute walk to underground station',
      ],
      supportServices: 'Mental health support team available on-site weekdays 9am-5pm',
      matchReasons: [
        'Suitable for single person with no dependent children',
        'Ground floor access available for any mobility needs',
        'On-site mental health support aligns with your identified support needs',
        'Available immediately for emergency accommodation',
      ],
      mismatchReasons: [
        'Studio flat may not be suitable for a household of 3 (1 adult and 2 children)',
        'Not in preferred borough near children\'s school',
      ],
      landlord: {
        name: 'Sarah Mitchell',
        company: 'Riverside Housing Association',
        phone: '020 7946 0123',
        email: 'sarah.mitchell@riversidehousing.org.uk'
      }
    },
    {
      image: housing2,
      name: 'Central Emergency Accommodation',
      address: 'Apartment 12, Parkside House\n78 Park Road\nLondon\nE1 4PQ',
      propertyType: '2-bedroom flat',
      availableFrom: 'Tomorrow',
      facilities: [
        'Separate living room and kitchen',
        'Two bedrooms',
        'Furnished with basic appliances',
        'Secure entry system',
        'Communal garden',
      ],
      transport: [
        '2 minute walk to bus stop',
        '8 minute walk to Stepney Green underground station',
      ],
      supportServices: 'Weekly visit from housing support officer. Interpreter services available on request.',
      matchReasons: [
        'Two bedrooms suitable for 1 adult and 2 children',
        'Located in borough near children\'s primary school',
        'Secure building appropriate for safeguarding needs',
        'Interpreter services available for Arabic speakers',
      ],
      mismatchReasons: [
        'Not available until tomorrow — applicant may need interim accommodation tonight',
        'No on-site mental health support',
      ],
      landlord: {
        name: 'James Chen',
        company: 'Parkside Properties Ltd',
        phone: '020 7946 0456',
        email: 'j.chen@parksideproperties.co.uk'
      }
    },
    {
      image: housing3,
      name: 'Maple Court Housing',
      address: 'Unit 5, Maple Court\n23 Maple Avenue\nLondon\nN7 8BB',
      propertyType: '2-bedroom maisonette',
      availableFrom: 'Today',
      facilities: [
        'Private entrance',
        'Two bedrooms over two floors',
        'Unfurnished — furniture pack available on request',
        'Garden access',
        'On-site caretaker',
      ],
      transport: [
        '7 minute walk to Holloway Road underground station',
        '3 minute walk to multiple bus routes',
      ],
      supportServices: 'Children\'s centre within 10 minute walk. Mental health outreach team covers this area.',
      matchReasons: [
        'Two bedrooms suitable for 1 adult and 2 children',
        'Near local schools with good Ofsted ratings',
        'Mental health outreach team available in the area',
        'Available immediately for emergency accommodation',
      ],
      mismatchReasons: [
        'Not in the same borough as children\'s current school',
        'Unfurnished — would need furniture pack arranged',
      ],
      landlord: {
        name: 'Patricia O\'Brien',
        company: 'Maple Court Management',
        phone: '020 7946 0789',
        email: 'patricia@maplecourt.org.uk'
      }
    },
    {
      image: housing4,
      name: 'Hillside Temporary Residence',
      address: 'Flat 8, Hillside Apartments\n91 Hill Street\nLondon\nSW3 5TT',
      propertyType: '3-bedroom flat',
      availableFrom: 'Today',
      facilities: [
        'Three bedrooms',
        'Separate kitchen and living area',
        'Fully furnished',
        'Lift access to all floors',
        'On-site laundry facilities',
      ],
      transport: [
        '4 minute walk to Sloane Square underground station',
        '1 minute walk to bus stop',
      ],
      supportServices: 'Dedicated family support worker. On-site children\'s play area. Links to local GP and mental health services.',
      matchReasons: [
        'Three bedrooms gives adequate space for family of 3',
        'Dedicated family support worker on-site',
        'Links to mental health services match identified needs',
        'Available immediately for emergency accommodation',
        'Fully furnished — no additional arrangements needed',
      ],
      mismatchReasons: [
        'Further from children\'s current school — may require school transport',
      ],
      landlord: {
        name: 'David Thompson',
        company: 'Hillside Housing Trust',
        phone: '020 7946 0234',
        email: 'd.thompson@hillsidehousing.org.uk'
      }
    },
    {
      image: housing5,
      name: 'Gateway Housing Unit',
      address: 'Studio 2, Gateway Building\n34 Gateway Road\nLondon\nW2 6HH',
      propertyType: 'Self-contained studio flat',
      availableFrom: 'Today',
      facilities: [
        'Open-plan living and sleeping area',
        'Kitchenette',
        'Shared laundry room',
        'CCTV and secure entry',
        'Furnished',
      ],
      transport: [
        '6 minute walk to Paddington station',
        '2 minute walk to bus stop',
      ],
      supportServices: 'Resettlement support available. Substance misuse counselling on-site.',
      matchReasons: [
        'Secure building with CCTV appropriate for safeguarding concerns',
        'Available immediately for emergency accommodation',
        'Good transport links for hospital appointments',
      ],
      mismatchReasons: [
        'Studio flat not suitable for a household of 3 (1 adult and 2 children)',
        'Not in preferred borough',
        'No dedicated mental health support on-site',
      ],
      landlord: {
        name: 'Emily Watson',
        company: 'Gateway Accommodation Services',
        phone: '020 7946 0567',
        email: 'emily.watson@gatewayhousing.co.uk'
      }
    },
    {
      image: housing6,
      name: 'Victoria Emergency Housing',
      address: 'Flat 7, Victoria House\n56 Victoria Street\nLondon\nSW1V 1RH',
      propertyType: '2-bedroom flat',
      availableFrom: 'Today',
      facilities: [
        'Two bedrooms',
        'Open-plan kitchen and living room',
        'Furnished',
        'Balcony',
        'Bike storage',
      ],
      transport: [
        '3 minute walk to Victoria underground and mainline station',
        'Multiple bus routes outside the building',
      ],
      supportServices: 'Arabic-speaking support worker available. Weekly mental health drop-in sessions.',
      matchReasons: [
        'Two bedrooms suitable for 1 adult and 2 children',
        'Arabic-speaking support worker available',
        'Weekly mental health drop-in sessions match identified needs',
        'Available immediately for emergency accommodation',
        'Excellent transport links for school and hospital appointments',
      ],
      mismatchReasons: [
        'Not in preferred borough — children would need to change school or travel',
      ],
      landlord: {
        name: 'Michael Roberts',
        company: 'Victoria Housing Group',
        phone: '020 7946 0890',
        email: 'michael.roberts@victoriahousing.org.uk'
      }
    }
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Basic validation
    const newErrors: Array<{ target: string; message: string }> = []

    if (!formData.get('firstName')) {
      newErrors.push({ target: 'firstName', message: 'Enter your first name' })
    }
    if (!formData.get('lastName')) {
      newErrors.push({ target: 'lastName', message: 'Enter your last name' })
    }
    if (!formData.get('currentAccommodation')) {
      newErrors.push({ target: 'currentAccommodation', message: 'Select your current accommodation type' })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])

    // Show loading screen
    setCurrentView('loading')

    // Simulate matching process
    setTimeout(() => {
      setCurrentView('results')
    }, 3000)

    // Collect form data
    const data: HomelessAssessmentData = {
      personalDetails: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        dateOfBirth: {
          day: formData.get('dob-day') as string,
          month: formData.get('dob-month') as string,
          year: formData.get('dob-year') as string,
        },
        phoneNumber: formData.get('phoneNumber') as string,
        email: formData.get('email') as string,
      },
      housingSituation: {
        currentAccommodation: formData.get('currentAccommodation') as string,
        accommodationDetails: formData.get('accommodationDetails') as string,
        durationAtAddress: formData.get('durationAtAddress') as string,
        reasonForHomelessness: formData.get('reasonForHomelessness') as string,
      },
      supportNeeds: {
        needs: formData.getAll('supportNeeds') as string[],
        needsDetails: formData.get('needsDetails') as string,
      },
      priorityNeeds: {
        hasDependentChildren: formData.get('hasDependentChildren') as string,
        numberOfChildren: formData.get('numberOfChildren') as string || undefined,
        isPregnant: formData.get('isPregnant') as string,
        hasPhysicalDisability: formData.get('hasPhysicalDisability') as string,
        hasMentalHealthCondition: formData.get('hasMentalHealthCondition') as string,
        isDomesticViolenceVictim: formData.get('isDomesticViolenceVictim') as string,
        isYoungPersonAtRisk: formData.get('isYoungPersonAtRisk') as string,
        additionalDetails: formData.get('additionalDetails') as string,
      },
    }

    onSubmit?.(data)
  }

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = translateMode && translateLanguage ? translateLanguage : 'en-GB'

    recognition.onresult = (event: any) => {
      let interim = ''
      let final = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          final += transcriptText + ' '
        } else {
          interim += transcriptText
        }
      }

      if (final) {
        if (translateMode && translateLanguage) {
          // Simulate AI translation to English
          const selectedLang = translateLanguages.find(l => l.code === translateLanguage)
          setTranscript(prev => prev + `[Translated from ${selectedLang?.label}] ${final}`)
        } else {
          setTranscript(prev => prev + final)
        }
      }
      setInterimTranscript(interim)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      if (event.error === 'no-speech') {
        console.log('No speech detected, continuing...')
      }
    }

    recognition.onend = () => {
      // Restart if still recording
      if (isRecording) {
        recognition.start()
      }
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isRecording, translateMode, translateLanguage])

  const startVoiceRecording = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.')
      return
    }

    setTranscript('')
    setInterimTranscript('')
    setCurrentView('recording')
    recognitionRef.current?.start()
    setIsRecording(true)
    setIsPaused(false)
  }

  const pauseRecording = () => {
    if (isPaused) {
      // Resume
      recognitionRef.current?.start()
      setIsPaused(false)
    } else {
      // Pause
      recognitionRef.current?.stop()
      setIsPaused(true)
    }
  }

  const stopRecording = () => {
    recognitionRef.current?.stop()
    setIsRecording(false)
    setIsPaused(false)

    // Auto-populate form with sample data
    const sampleData = {
      firstName: 'John',
      lastName: 'Smith',
      'dob-day': '15',
      'dob-month': '06',
      'dob-year': '1985',
      phoneNumber: '07700 900123',
      email: 'john.smith@example.com',
      currentAccommodation: 'rough-sleeping',
      accommodationDetails: 'Currently sleeping rough in the city centre, near the train station. Have been moving between different locations for safety.',
      durationAtAddress: 'less-than-week',
      reasonForHomelessness: 'Lost my job 3 months ago and could not keep up with rent payments. Landlord evicted me and I have been unable to find stable accommodation since.',
      supportNeeds: ['mental-health', 'substance-use'],
      needsDetails: 'Experiencing depression and anxiety due to current situation. Also struggling with alcohol dependency which started after losing my job.',
      hasDependentChildren: 'no',
      isPregnant: 'no',
      hasPhysicalDisability: 'no',
      hasMentalHealthCondition: 'yes',
      isDomesticViolenceVictim: 'no',
      isYoungPersonAtRisk: 'no',
      additionalDetails: 'Have been trying to find work but difficult without a fixed address. Need support with mental health services and substance abuse treatment.'
    }

    setFormData(sampleData)
    setCurrentView('form')
  }

  const fillByHand = () => {
    setFormData(null)
    setFormStep(1)
    setFormFields({})
    setCurrentView('formEntry')
  }

  const acceptProperty = () => {
    // Show confirmation with landlord details
    setCurrentView('confirmation')
  }

  const searchAgain = () => {
    // Move to next property (or cycle back to start)
    setCurrentPropertyIndex((prev) => (prev + 1) % properties.length)
    // Simulate searching again
    setCurrentView('loading')
    setTimeout(() => {
      setCurrentView('results')
    }, 2000)
  }

  const releaseAndSearchAgain = () => {
    // Release current property and search for another
    searchAgain()
  }

  const confirmProperty = () => {
    // Final confirmation - could trigger actual booking logic here
    alert('Property confirmed! The applicant will be contacted with move-in details.')
    setCurrentView('form')
  }

  const handleRejection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const reason = form.get('rejectionReason') as string

    if (!reason) {
      alert('Please provide a reason why this property is not suitable')
      return
    }

    setRejectionReason(reason)
    // Move to next property and simulate searching
    setCurrentPropertyIndex((prev) => (prev + 1) % properties.length)
    setCurrentView('loading')
    setTimeout(() => {
      setCurrentView('results')
    }, 2000)
  }

  return (
    <PageTemplate
      serviceName={serviceName}
      title="Homelessness assessment"
      navigationItems={[
        { text: 'Home', href: '/' },
        { text: 'Assessments', href: '/assessments' },
        { text: 'New Assessment', href: '/assessments/new', current: true },
      ]}
    >
      {/* Guidance View - Shows automatically at start */}
      {currentView === 'guidance' && (
        <>
          <p className="govuk-body">
            This assessment helps us understand your housing situation so we can decide what help we can offer.
          </p>

          <p className="govuk-body">We use the information you give to:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>check if we have a legal duty to help you</li>
            <li>decide what housing or support may be available</li>
          </ul>

          <p className="govuk-body">We keep your information confidential.</p>

          <Heading level={2} size="m">Before you start</Heading>
          <p className="govuk-body">
            This assessment is made up of several sections. You can take your time and answer as fully as you can.
          </p>
          <p className="govuk-body">
            Some questions may feel personal or difficult. You only need to share what you are comfortable with,
            but missing information may affect the support we can offer.
          </p>

          <Heading level={2} size="m">Recording the assessment</Heading>
          <p className="govuk-body">
            If you agree, we can record this assessment so we do not need to type. You can speak in the language you are most comfortable using and the AI will translate for you.
          </p>
          <p className="govuk-body">
            The recording is used only to make sure we capture your information accurately.
            It will not be shared outside the housing team.
          </p>
          <p className="govuk-body">
            You can stop the recording at any time.
          </p>

          <p className="govuk-body">You can choose to:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>start voice recording, or</li>
            <li>fill in the form yourself</li>
          </ul>

          <Heading level={2} size="m">What to do next</Heading>
          <p className="govuk-body">
            Choose how you want to complete the assessment.
          </p>

          <div style={{ marginTop: '30px' }}>
            <ButtonGroup>
              <Button onClick={startVoiceRecording}>
                Start voice recording
              </Button>
              <Button variant="secondary" onClick={fillByHand}>
                Fill in the form yourself
              </Button>
            </ButtonGroup>
          </div>
        </>
      )}

      {/* Recording View - Shows during voice recording */}
      {currentView === 'recording' && (
        <>
          {/* Sticky recording controls */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '15px 20px',
            backgroundColor: '#f3f2f1',
            borderLeft: '5px solid #1d70b8',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {!isPaused ? (
                  <strong className="govuk-tag govuk-tag--red">Recording</strong>
                ) : (
                  <strong className="govuk-tag govuk-tag--yellow">Paused</strong>
                )}
                {translateMode && translateLanguage && (
                  <strong className="govuk-tag govuk-tag--blue">
                    Translating from {translateLanguages.find(l => l.code === translateLanguage)?.label}
                  </strong>
                )}
              </div>
              <ButtonGroup>
                <Button onClick={() => setShowLanguageSelector(!showLanguageSelector)} variant="secondary">
                  Translate
                </Button>
                <Button onClick={pauseRecording} variant="secondary">
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button onClick={stopRecording} variant="warning">
                  Stop and complete form
                </Button>
              </ButtonGroup>
            </div>
            {showLanguageSelector && (
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#ffffff', border: '1px solid #b1b4b6' }}>
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                    What language is your client speaking?
                  </legend>
                  <p className="govuk-hint">The AI will listen in this language and translate to English</p>
                  <select
                    className="govuk-select"
                    id="translateLanguage"
                    value={translateLanguage}
                    onChange={(e) => {
                      const lang = e.target.value
                      setTranslateLanguage(lang)
                      if (lang) {
                        setTranslateMode(true)
                        // Restart recognition with new language
                        if (isRecording && !isPaused) {
                          recognitionRef.current?.stop()
                          setTimeout(() => recognitionRef.current?.start(), 200)
                        }
                      } else {
                        setTranslateMode(false)
                      }
                      setShowLanguageSelector(false)
                    }}
                  >
                    <option value="">English (no translation)</option>
                    {translateLanguages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.label}</option>
                    ))}
                  </select>
                </fieldset>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <p className="govuk-caption-l" style={{ marginBottom: '5px' }}>
            Step {recordingStep} of 9
          </p>
          <Heading level={1} size="l">{stepTitles[recordingStep - 1]}</Heading>

          {/* Live transcription (collapsible) */}
          {(transcript || interimTranscript) && (
            <Details summary="View live transcription">
              <div style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                maxHeight: '150px',
                overflow: 'auto'
              }}>
                {transcript}
                {interimTranscript && (
                  <span style={{ color: '#505a5f', fontStyle: 'italic' }}>
                    {interimTranscript}
                  </span>
                )}
              </div>
            </Details>
          )}

          {/* Step 1: Identity and contact details */}
          {recordingStep === 1 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We ask this so we can contact you quickly about your accommodation.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q1-1" type="checkbox"
                    checked={checkedQuestions['q1-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q1-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q1-1">
                    What is your full name?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q1-2" type="checkbox"
                    checked={checkedQuestions['q1-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q1-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q1-2">
                    Do you have a contact address? (If not, that's okay.)
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q1-3" type="checkbox"
                    checked={checkedQuestions['q1-3'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q1-3': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q1-3">
                    What is the best phone number to reach you on?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q1-4" type="checkbox"
                    checked={checkedQuestions['q1-4'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q1-4': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q1-4">
                    Do you have an email address? (If available.)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Household composition */}
          {recordingStep === 2 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We ask this to work out the size and type of accommodation needed.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q2-1" type="checkbox"
                    checked={checkedQuestions['q2-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q2-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q2-1">
                    Who will be staying in the accommodation with you?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q2-2" type="checkbox"
                    checked={checkedQuestions['q2-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q2-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q2-2">
                    How many adults are in your household?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q2-3" type="checkbox"
                    checked={checkedQuestions['q2-3'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q2-3': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q2-3">
                    How many children are in your household?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q2-4" type="checkbox"
                    checked={checkedQuestions['q2-4'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q2-4': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q2-4">
                    What are the ages of the children?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q2-5" type="checkbox"
                    checked={checkedQuestions['q2-5'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q2-5': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q2-5">
                    Is anyone pregnant?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q2-6" type="checkbox"
                    checked={checkedQuestions['q2-6'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q2-6': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q2-6">
                    Is gender relevant for safeguarding or safety reasons?
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: When accommodation is needed */}
          {recordingStep === 3 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We ask this to understand how urgently you need accommodation.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q3-1" type="checkbox"
                    checked={checkedQuestions['q3-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q3-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q3-1">
                    Are you homeless today, or at risk of homelessness on a specific date?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q3-2" type="checkbox"
                    checked={checkedQuestions['q3-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q3-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q3-2">
                    If you are not homeless today, what date will you need accommodation?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q3-3" type="checkbox"
                    checked={checkedQuestions['q3-3'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q3-3': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q3-3">
                    Are you currently somewhere safe to stay tonight?
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Location constraints */}
          {recordingStep === 4 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We ask this to understand where we can safely place you.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q4-1" type="checkbox"
                    checked={checkedQuestions['q4-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q4-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q4-1">
                    Do you need to stay in this borough?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q4-2" type="checkbox"
                    checked={checkedQuestions['q4-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q4-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q4-2">
                    If yes, why? (For example: work, school, caring responsibilities, medical needs, or safety.)
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q4-3" type="checkbox"
                    checked={checkedQuestions['q4-3'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q4-3': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q4-3">
                    Are there any areas where you cannot be placed due to risk or safety concerns?
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Health and medical needs */}
          {recordingStep === 5 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We ask this to make sure any accommodation we offer is safe and suitable.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q5-1" type="checkbox"
                    checked={checkedQuestions['q5-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q5-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q5-1">
                    Does anyone in your household have a medical condition or disability that affects housing needs?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q5-2" type="checkbox"
                    checked={checkedQuestions['q5-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q5-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q5-2">
                    Does anyone have mobility needs, such as difficulty with stairs or lifts?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q5-3" type="checkbox"
                    checked={checkedQuestions['q5-3'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q5-3': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q5-3">
                    Do you need ground-floor accommodation?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q5-4" type="checkbox"
                    checked={checkedQuestions['q5-4'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q5-4': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q5-4">
                    Do you need any adaptations, such as grab rails or level access?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q5-5" type="checkbox"
                    checked={checkedQuestions['q5-5'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q5-5': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q5-5">
                    Are there any mental health needs that affect where you can stay?
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Risk and safeguarding */}
          {recordingStep === 6 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We ask this before placing anyone in temporary accommodation.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q6-1" type="checkbox"
                    checked={checkedQuestions['q6-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q6-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q6-1">
                    Does anyone in your household pose a risk to themselves?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q6-2" type="checkbox"
                    checked={checkedQuestions['q6-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q6-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q6-2">
                    Does anyone pose a risk to others, including staff or neighbours?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q6-3" type="checkbox"
                    checked={checkedQuestions['q6-3'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q6-3': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q6-3">
                    Is there a history of violence, abuse, or safeguarding concerns we should be aware of?
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Support needs */}
          {recordingStep === 7 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We ask this to make sure temporary accommodation will work for you.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q7-1" type="checkbox"
                    checked={checkedQuestions['q7-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q7-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q7-1">
                    Does anyone currently receive support to manage a tenancy or licence?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q7-2" type="checkbox"
                    checked={checkedQuestions['q7-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q7-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q7-2">
                    Would you need additional support while staying in temporary accommodation?
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Legal eligibility */}
          {recordingStep === 8 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">We need to check a few things before we can offer temporary accommodation.</p>
              <p className="govuk-body govuk-!-margin-bottom-4">These questions help us understand whether the council is allowed to provide housing support.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q8-1" type="checkbox"
                    checked={checkedQuestions['q8-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q8-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q8-1">
                    Are you allowed to receive housing help from the council?
                    <span className="govuk-hint govuk-!-margin-top-1 govuk-!-margin-bottom-0">For example, this can depend on your immigration or residency status.</span>
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q8-2" type="checkbox"
                    checked={checkedQuestions['q8-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q8-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q8-2">
                    Do you have access to public funds?
                    <span className="govuk-hint govuk-!-margin-top-1 govuk-!-margin-bottom-0">This means whether you're allowed to claim benefits or receive housing support in the UK.</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 9: Practical considerations */}
          {recordingStep === 9 && (
            <div style={{ marginTop: '20px' }}>
              <p className="govuk-body">These final questions help us find the right short-term accommodation.</p>
              <div className="govuk-checkboxes govuk-checkboxes--small" style={{ marginTop: '20px' }}>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q9-1" type="checkbox"
                    checked={checkedQuestions['q9-1'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q9-1': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q9-1">
                    Do you have any pets?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q9-2" type="checkbox"
                    checked={checkedQuestions['q9-2'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q9-2': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q9-2">
                    Do you have any belongings that need to be stored?
                  </label>
                </div>
                <div className="govuk-checkboxes__item">
                  <input className="govuk-checkboxes__input" id="q9-3" type="checkbox"
                    checked={checkedQuestions['q9-3'] || false}
                    onChange={(e) => setCheckedQuestions({...checkedQuestions, 'q9-3': e.target.checked})} />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="q9-3">
                    Do you need accommodation that is furnished? (Temporary accommodation usually is.)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ marginTop: '40px' }}>
            <ButtonGroup>
              {recordingStep > 1 && (
                <Button variant="secondary" onClick={() => setRecordingStep(recordingStep - 1)}>
                  Back
                </Button>
              )}
              {recordingStep < 9 ? (
                <Button onClick={() => setRecordingStep(recordingStep + 1)}>
                  Continue
                </Button>
              ) : (
                <Button onClick={stopRecording}>
                  Complete assessment
                </Button>
              )}
            </ButtonGroup>
          </div>
        </>
      )}

      {/* Form Entry View - Step-by-step form for manual entry */}
      {currentView === 'formEntry' && (
        <>
          {/* Progress indicator */}
          <p className="govuk-caption-l" style={{ marginBottom: '5px' }}>
            Step {formStep} of 9
          </p>
          <Heading level={1} size="l">{stepTitles[formStep - 1]}</Heading>

          {/* Step 1: Identity and contact details */}
          {formStep === 1 && (
            <div style={{ marginTop: '20px' }}>
              <TextInput
                id="fullName"
                name="fullName"
                label="Full name"
                value={formFields.fullName || ''}
                onChange={(value) => updateFormField('fullName', value)}
              />
              <Textarea
                id="contactAddress"
                name="contactAddress"
                label="Contact address"
                hint="If you don't have a fixed address, you can use a friend's address or leave blank"
                rows={4}
                value={formFields.contactAddress || ''}
                onChange={(value) => updateFormField('contactAddress', value)}
              />
              <TextInput
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                hint="We'll use this to contact you about your accommodation"
                value={formFields.phoneNumber || ''}
                onChange={(value) => updateFormField('phoneNumber', value)}
              />
              <TextInput
                id="emailAddress"
                name="emailAddress"
                label="Email address (optional)"
                value={formFields.emailAddress || ''}
                onChange={(value) => updateFormField('emailAddress', value)}
              />
            </div>
          )}

          {/* Step 2: Household composition */}
          {formStep === 2 && (
            <div style={{ marginTop: '20px' }}>
              <Textarea
                id="whoStaying"
                name="whoStaying"
                label="Who will be staying in the accommodation with you?"
                rows={3}
                value={formFields.whoStaying || ''}
                onChange={(value) => updateFormField('whoStaying', value)}
              />
              <TextInput
                id="numAdults"
                name="numAdults"
                label="How many adults are in your household?"
                width={5}
                value={formFields.numAdults || ''}
                onChange={(value) => updateFormField('numAdults', value)}
              />
              <TextInput
                id="numChildren"
                name="numChildren"
                label="How many children are in your household?"
                width={5}
                value={formFields.numChildren || ''}
                onChange={(value) => updateFormField('numChildren', value)}
              />
              <TextInput
                id="childrenAges"
                name="childrenAges"
                label="What are the ages of the children?"
                hint="For example: 5 and 8"
                value={formFields.childrenAges || ''}
                onChange={(value) => updateFormField('childrenAges', value)}
              />
              <Radios
                name="anyonePregnant"
                legend="Is anyone pregnant?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.anyonePregnant || ''}
                onChange={(value) => updateFormField('anyonePregnant', value)}
              />
              <Radios
                name="genderRelevant"
                legend="Is gender relevant for safeguarding or safety reasons?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.genderRelevant || ''}
                onChange={(value) => updateFormField('genderRelevant', value)}
              />
            </div>
          )}

          {/* Step 3: When accommodation is needed */}
          {formStep === 3 && (
            <div style={{ marginTop: '20px' }}>
              <Radios
                name="homelessStatus"
                legend="Are you homeless today, or at risk of homelessness on a specific date?"
                options={[
                  { value: 'homeless-today', label: 'Homeless today' },
                  { value: 'at-risk', label: 'At risk of homelessness on a specific date' }
                ]}
                defaultValue={formFields.homelessStatus || ''}
                onChange={(value) => updateFormField('homelessStatus', value)}
              />
              <TextInput
                id="dateNeeded"
                name="dateNeeded"
                label="If you are not homeless today, what date will you need accommodation?"
                hint="For example, 27 3 2024"
                value={formFields.dateNeeded || ''}
                onChange={(value) => updateFormField('dateNeeded', value)}
              />
              <Radios
                name="safeTonight"
                legend="Are you currently somewhere safe to stay tonight?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.safeTonight || ''}
                onChange={(value) => updateFormField('safeTonight', value)}
              />
            </div>
          )}

          {/* Step 4: Location constraints */}
          {formStep === 4 && (
            <div style={{ marginTop: '20px' }}>
              <Radios
                name="stayInBorough"
                legend="Do you need to stay in this borough?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.stayInBorough || ''}
                onChange={(value) => updateFormField('stayInBorough', value)}
              />
              <Textarea
                id="boroughReason"
                name="boroughReason"
                label="If yes, why?"
                hint="For example: work, school, caring responsibilities, medical needs, or safety"
                rows={3}
                value={formFields.boroughReason || ''}
                onChange={(value) => updateFormField('boroughReason', value)}
              />
              <Textarea
                id="excludedAreas"
                name="excludedAreas"
                label="Are there any areas where you cannot be placed due to risk or safety concerns?"
                rows={3}
                value={formFields.excludedAreas || ''}
                onChange={(value) => updateFormField('excludedAreas', value)}
              />
            </div>
          )}

          {/* Step 5: Health and medical needs */}
          {formStep === 5 && (
            <div style={{ marginTop: '20px' }}>
              <Radios
                name="medicalCondition"
                legend="Does anyone in your household have a medical condition or disability that affects housing needs?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.medicalCondition || ''}
                onChange={(value) => updateFormField('medicalCondition', value)}
              />
              <Radios
                name="mobilityNeeds"
                legend="Does anyone have mobility needs, such as difficulty with stairs or lifts?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.mobilityNeeds || ''}
                onChange={(value) => updateFormField('mobilityNeeds', value)}
              />
              <Radios
                name="groundFloor"
                legend="Do you need ground-floor accommodation?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.groundFloor || ''}
                onChange={(value) => updateFormField('groundFloor', value)}
              />
              <Radios
                name="adaptations"
                legend="Do you need any adaptations, such as grab rails or level access?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.adaptations || ''}
                onChange={(value) => updateFormField('adaptations', value)}
              />
              <Radios
                name="mentalHealthNeeds"
                legend="Are there any mental health needs that affect where you can stay?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.mentalHealthNeeds || ''}
                onChange={(value) => updateFormField('mentalHealthNeeds', value)}
              />
            </div>
          )}

          {/* Step 6: Risk and safeguarding */}
          {formStep === 6 && (
            <div style={{ marginTop: '20px' }}>
              <Radios
                name="riskToSelf"
                legend="Does anyone in your household pose a risk to themselves?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.riskToSelf || ''}
                onChange={(value) => updateFormField('riskToSelf', value)}
              />
              <Radios
                name="riskToOthers"
                legend="Does anyone pose a risk to others, including staff or neighbours?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.riskToOthers || ''}
                onChange={(value) => updateFormField('riskToOthers', value)}
              />
              <Radios
                name="safeguardingHistory"
                legend="Is there a history of violence, abuse, or safeguarding concerns we should be aware of?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.safeguardingHistory || ''}
                onChange={(value) => updateFormField('safeguardingHistory', value)}
              />
            </div>
          )}

          {/* Step 7: Support needs */}
          {formStep === 7 && (
            <div style={{ marginTop: '20px' }}>
              <Radios
                name="currentSupport"
                legend="Does anyone currently receive support to manage a tenancy or licence?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.currentSupport || ''}
                onChange={(value) => updateFormField('currentSupport', value)}
              />
              <Radios
                name="additionalSupport"
                legend="Would you need additional support while staying in temporary accommodation?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.additionalSupport || ''}
                onChange={(value) => updateFormField('additionalSupport', value)}
              />
            </div>
          )}

          {/* Step 8: Legal eligibility */}
          {formStep === 8 && (
            <div style={{ marginTop: '20px' }}>
              <Radios
                name="eligibleForAssistance"
                legend="Are you allowed to receive housing help from the council?"
                hint="For example, this can depend on your immigration or residency status"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'not-sure', label: 'Not sure' }
                ]}
                defaultValue={formFields.eligibleForAssistance || ''}
                onChange={(value) => updateFormField('eligibleForAssistance', value)}
              />
              <Radios
                name="publicFunds"
                legend="Do you have access to public funds?"
                hint="This means whether you're allowed to claim benefits or receive housing support in the UK"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'not-sure', label: 'Not sure' }
                ]}
                defaultValue={formFields.publicFunds || ''}
                onChange={(value) => updateFormField('publicFunds', value)}
              />
            </div>
          )}

          {/* Step 9: Practical considerations */}
          {formStep === 9 && (
            <div style={{ marginTop: '20px' }}>
              <Radios
                name="hasPets"
                legend="Do you have any pets?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.hasPets || ''}
                onChange={(value) => updateFormField('hasPets', value)}
              />
              <Radios
                name="belongingsToStore"
                legend="Do you have any belongings that need to be stored?"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.belongingsToStore || ''}
                onChange={(value) => updateFormField('belongingsToStore', value)}
              />
              <Radios
                name="furnishedNeeded"
                legend="Do you need accommodation that is furnished?"
                hint="Temporary accommodation usually is furnished"
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
                inline
                defaultValue={formFields.furnishedNeeded || ''}
                onChange={(value) => updateFormField('furnishedNeeded', value)}
              />
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ marginTop: '40px' }}>
            <ButtonGroup>
              {formStep > 1 && (
                <Button variant="secondary" onClick={() => setFormStep(formStep - 1)}>
                  Back
                </Button>
              )}
              {formStep < 9 ? (
                <Button onClick={() => setFormStep(formStep + 1)}>
                  Continue
                </Button>
              ) : (
                <Button onClick={() => setCurrentView('form')}>
                  Review your answers
                </Button>
              )}
            </ButtonGroup>
          </div>
        </>
      )}

      {/* Form View - Check Answers page */}
      {currentView === 'form' && (
        <>
          <Heading level={1} size="l">Check your answers before submitting</Heading>

          {/* Section 1: Identity and contact details */}
          <Heading level={2} size="m">Identity and contact details</Heading>
          <SummaryList rows={[
            { key: 'Full name', value: 'Sarah Johnson', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'full name' }] },
            { key: 'Contact address', value: <>c/o Friend's Address<br />42 Park Lane<br />London<br />E1 4PQ</>, actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'contact address' }] },
            { key: 'Phone number', value: '07700 900123', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'phone number' }] },
            { key: 'Email address', value: 'sarah.johnson@email.com', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'email address' }] },
            { key: 'Preferred language', value: 'Arabic', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'preferred language' }] },
          ]} />

          {/* Section 2: Household composition */}
          <Heading level={2} size="m">Household composition</Heading>
          <SummaryList rows={[
            { key: 'Who will be staying', value: 'Just me and my two children', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'who will be staying' }] },
            { key: 'Number of adults', value: '1', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'number of adults' }] },
            { key: 'Number of children', value: '2', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'number of children' }] },
            { key: 'Ages of children', value: '5 and 8', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'ages of children' }] },
            { key: 'Anyone pregnant', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'pregnancy status' }] },
            { key: 'Gender relevant for safety', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'gender safety relevance' }] },
          ]} />

          {/* Section 3: Urgency and timing */}
          <Heading level={2} size="m">Urgency and timing</Heading>
          <SummaryList rows={[
            { key: 'Homelessness status', value: 'Homeless today', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'homelessness status' }] },
            { key: 'Safe place tonight', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'safe place tonight' }] },
          ]} />

          {/* Section 4: Location constraints */}
          <Heading level={2} size="m">Location constraints</Heading>
          <SummaryList rows={[
            { key: 'Need to stay in borough', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'borough requirement' }] },
            { key: 'Reason for borough', value: 'Children attend local primary school in the area. I also have regular hospital appointments at the local health centre for ongoing treatment.', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'reason for borough' }] },
            { key: 'Excluded areas', value: 'None', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'excluded areas' }] },
          ]} />

          {/* Section 5: Health and medical needs */}
          <Heading level={2} size="m">Health and medical needs</Heading>
          <SummaryList rows={[
            { key: 'Medical condition affecting housing', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'medical condition' }] },
            { key: 'Mobility needs', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'mobility needs' }] },
            { key: 'Ground-floor needed', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'ground floor requirement' }] },
            { key: 'Adaptations needed', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'adaptations needed' }] },
            { key: 'Mental health needs', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'mental health needs' }] },
          ]} />

          {/* Section 6: Risk and safeguarding */}
          <Heading level={2} size="m">Risk and safeguarding</Heading>
          <SummaryList rows={[
            { key: 'Risk to self', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'risk to self' }] },
            { key: 'Risk to others', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'risk to others' }] },
            { key: 'Safeguarding history', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'safeguarding history' }] },
          ]} />

          {/* Section 7: Support needs */}
          <Heading level={2} size="m">Support needs</Heading>
          <SummaryList rows={[
            { key: 'Currently receiving support', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'current support' }] },
            { key: 'Additional support needed', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'additional support' }] },
          ]} />

          {/* Section 8: Legal eligibility */}
          <Heading level={2} size="m">Legal eligibility</Heading>
          <SummaryList rows={[
            { key: 'Eligible for assistance', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'eligibility' }] },
            { key: 'Access to public funds', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'public funds access' }] },
            { key: 'Local Housing Allowance entitlement', value: '1 bedroom rate', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'Local Housing Allowance entitlement' }] },
          ]} />

          {/* Section 9: Practical considerations */}
          <Heading level={2} size="m">Practical considerations</Heading>
          <SummaryList rows={[
            { key: 'Pets', value: 'No', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'pets' }] },
            { key: 'Belongings to store', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'belongings storage' }] },
            { key: 'Furnished accommodation needed', value: 'Yes', actions: [{ href: '#', text: 'Change', visuallyHiddenText: 'furnished requirement' }] },
          ]} />

          {/* Submit section */}
          <Heading level={2} size="m">Now submit your assessment</Heading>
          <p className="govuk-body">
            By submitting this assessment you are confirming that, to the best of your knowledge, the details you are providing are correct.
          </p>

          <Button onClick={() => {
            setCurrentView('loading')
            setTimeout(() => {
              setCurrentView('results')
            }, 3000)
          }}>Accept and send</Button>
        </>
      )}

      {/* Loading View - Shows while matching accommodation */}
      {currentView === 'loading' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            display: 'inline-block',
            width: '60px',
            height: '60px',
            border: '6px solid #f3f2f1',
            borderTop: '6px solid #1d70b8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '30px'
          }}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <Heading level={2} size="m">Matching you with emergency accommodation</Heading>
          <p className="govuk-body" style={{ fontSize: '19px', marginTop: '20px' }}>
            Please wait while we search our database for suitable properties based on your needs...
          </p>
        </div>
      )}

      {/* Results View - Shows matched property */}
      {currentView === 'results' && (() => {
        const currentProperty = properties[currentPropertyIndex]
        if (!currentProperty) return null

        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentProperty.address.replace(/\n/g, ', '))}`

        return (
          <>
            <NotificationBanner
              type="success"
              title="Match found"
              heading="We've found an emergency accommodation property that matches your requirements"
            />

            <Heading level={2} size="m">Your matched property</Heading>

            <div style={{
              border: '2px solid #b1b4b6',
              padding: '20px',
              marginTop: '30px',
              marginBottom: '30px'
            }}>
              <Heading level={3} size="s">{currentProperty.name}</Heading>

              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <dl className="govuk-summary-list" style={{ flex: '0 0 40%', margin: 0 }}>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Address</dt>
                  <dd className="govuk-summary-list__value">
                    {currentProperty.address.split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </dd>
                </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Map</dt>
                <dd className="govuk-summary-list__value">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="govuk-link"
                  >
                    View on Google Maps
                  </a>
                </dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Property type</dt>
                <dd className="govuk-summary-list__value">{currentProperty.propertyType}</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Available from</dt>
                <dd className="govuk-summary-list__value">{currentProperty.availableFrom}</dd>
              </div>
            </dl>

            <div style={{
              flex: '0 0 60%',
              height: '400px',
              overflow: 'hidden',
              border: '1px solid #b1b4b6'
            }}>
              <img
                src={currentProperty.image}
                alt={`${currentProperty.name} exterior`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          <dl className="govuk-summary-list" style={{ marginTop: '20px' }}>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Facilities</dt>
              <dd className="govuk-summary-list__value">
                <ul className="govuk-list govuk-list--bullet">
                  {currentProperty.facilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Transport links</dt>
              <dd className="govuk-summary-list__value">
                <ul className="govuk-list govuk-list--bullet">
                  {currentProperty.transport.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Support services</dt>
              <dd className="govuk-summary-list__value">
                {currentProperty.supportServices}
              </dd>
            </div>
          </dl>

          <InsetText>
            <strong>Why this property matches your needs:</strong>
            <ul className="govuk-list govuk-list--bullet">
              {currentProperty.matchReasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </InsetText>

          <div style={{
            borderLeft: '5px solid #d4351c',
            padding: '15px',
            marginTop: '20px',
            backgroundColor: '#fef7f7'
          }}>
            <p className="govuk-body" style={{ marginBottom: '10px' }}><strong>What this property doesn't match:</strong></p>
            <ul className="govuk-list govuk-list--bullet" style={{ marginBottom: 0 }}>
              {currentProperty.mismatchReasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>

          <Heading level={3} size="s">Accept or search for alternative</Heading>

          <form onSubmit={handleRejection} style={{ marginTop: '30px' }}>
            <Details summary="This property is not suitable">
              <Textarea
                id="rejectionReason"
                name="rejectionReason"
                label="Tell us why this property is not suitable"
                hint="Provide specific reasons so we can find a more appropriate match"
                rows={4}
              />
              <Button type="submit" variant="warning">
                Search for alternative property
              </Button>
            </Details>
          </form>

          <div style={{ marginTop: '30px' }}>
            <ButtonGroup>
              <Button onClick={acceptProperty}>
                Accept this property
              </Button>
              <Button variant="secondary" onClick={() => setCurrentView('form')}>
                Review assessment details
              </Button>
            </ButtonGroup>
          </div>
        </>
      )})()}

      {/* Confirmation View - Shows landlord details and hold confirmation */}
      {currentView === 'confirmation' && (() => {
        const currentProperty = properties[currentPropertyIndex]
        if (!currentProperty) return null

        return (
          <>
            <NotificationBanner
              type="success"
              title="Property on hold"
              heading="We have placed a hold on this property for your applicant"
            />

            <Heading level={2} size="m">Contact the landlord</Heading>

            <p className="govuk-body" style={{ fontSize: '19px' }}>
              Please contact the landlord to confirm the booking and arrange move-in details.
              The hold will expire in 24 hours if not confirmed.
            </p>

            <div style={{
              border: '2px solid #b1b4b6',
              padding: '20px',
              marginTop: '30px',
              marginBottom: '30px'
            }}>
              <Heading level={3} size="s">Landlord details</Heading>

              <dl className="govuk-summary-list" style={{ marginTop: '20px' }}>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Name</dt>
                  <dd className="govuk-summary-list__value">{currentProperty.landlord.name}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Company</dt>
                  <dd className="govuk-summary-list__value">{currentProperty.landlord.company}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Phone</dt>
                  <dd className="govuk-summary-list__value">
                    <a href={`tel:${currentProperty.landlord.phone.replace(/\s/g, '')}`} className="govuk-link">
                      {currentProperty.landlord.phone}
                    </a>
                  </dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Email</dt>
                  <dd className="govuk-summary-list__value">
                    <a href={`mailto:${currentProperty.landlord.email}`} className="govuk-link">
                      {currentProperty.landlord.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <Button onClick={() => window.location.href = `mailto:${currentProperty.landlord.email}?subject=Emergency accommodation booking — ${currentProperty.name}`}>
                Contact landlord by email
              </Button>
              <p className="govuk-body govuk-!-margin-top-2" style={{ color: '#505a5f' }}>
                Use this if you are unable to get through by phone
              </p>
            </div>

            <div style={{
              border: '2px solid #b1b4b6',
              padding: '20px',
              marginTop: '30px',
              marginBottom: '30px',
              backgroundColor: '#f3f2f1'
            }}>
              <Heading level={3} size="s">Property details</Heading>
              <p className="govuk-body" style={{ marginTop: '15px' }}>
                <strong>{currentProperty.name}</strong><br />
                {currentProperty.address.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < currentProperty.address.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <WarningText>
              If you release this property, it will become available to other applicants and you will need to search for alternative accommodation.
            </WarningText>

            <div style={{ marginTop: '30px' }}>
              <ButtonGroup>
                <Button onClick={confirmProperty}>
                  Confirm booking
                </Button>
                <Button variant="warning" onClick={releaseAndSearchAgain}>
                  Release property and search again
                </Button>
              </ButtonGroup>
            </div>
          </>
        )
      })()}
    </PageTemplate>
  )
}

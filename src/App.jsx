import { FormGroup } from "./FormGroup"
import ReactSelect from "react-select"
import { useRef, useState } from "react"
import "./styles.css"
// import { checkCountry, checkEmail, checkPassword } from "./validators"
import { useForm } from "react-hook-form"


const COUNTRY_OPTIONS = [
  { label: "United States", value: "US" },
  { label: "India", value: "IN" },
  { label: "Mexico", value: "MX" },
]

function App() {
  const {
    register, 
    handleSubmit, 
    formState: { errors }}
    = useForm()
    
  const countryRef = useRef()
 
  const [countryErrors, setCountryErrors] = useState([])

  function onSubmit(data) {   
    setCountryErrors(countryResults)
      countryResults.length === 0
      alert("Success")
      
    }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">

      {/* email input */}
      <FormGroup errorMessage = {errors?.email?.message} > 
        <label className="label" htmlFor="email">
          Email
        </label>
        <input 
          className="input" 
          type="email" 
          id="email" {...register("email", { 
              required: {value: true, message:"Required"}, 
              validate: value => {
                if (!value.endsWith("@gmail.com")){
                  return "Must end with @gmail.com"
              }
        },
      })}        
        />
      </FormGroup>

{/* password input */}
      <FormGroup errorMessage={errors?.password?.message}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          {...register("password", { 
            required: {value: true, message:"Required"}, 
            minLength: {value: 10, message: " Must be at least 10 characters"},
            validate: { 
              hasLowerCase: value => {
                if (!value.match(/[a-z]/)){
                  return "Must include atleast 1 lowercase letter"
                }
              },

              hasUpperCase: value => {
                if (!value.match(/[A-Z]/)){
                  return "Must include atleast 1 Uppercase letter"
                }
              },

              hasNumber: value => {
                if (!value.match([/0-9/])){
                  return "Must include atleast 1 number"
                }
              }
             }
    })}        
        
        />
      </FormGroup>


      {/* country input */}
      <FormGroup errors={countryErrors}>
        <label className="label" htmlFor="country">
          Country
        </label>

        <ReactSelect
          isClearable
          classNamePrefix="react-select"
          id="country"
          ref={countryRef}
          options={COUNTRY_OPTIONS}
        />
      </FormGroup>

      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  )
}

export default App

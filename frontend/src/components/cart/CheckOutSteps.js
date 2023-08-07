import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import './CheckOutSteps.css'

const CheckOutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping/>,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck/>,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance/>,
        }
    ]

    const stepStyle = {
        boxSizing: "border-box"
    }
  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
            {steps.map((item, index) => (
                <Step key={index} active={activeStep===index?true:false} completed={activeStep >= index ? true:false}>
                    <StepLabel icon={item.icon} style={{
                        color: activeStep >= index ? "rgb(75,181,67)":"rgba(0,0,0,0.649)",
                    }}>
                        {item.label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </Fragment>
  )
}

export default CheckOutSteps

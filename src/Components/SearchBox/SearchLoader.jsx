import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function SearchLoader() {
    return (
        <TailSpin
            height="20"
            width="20"
            color="#767676"
            ariaLabel="tail-spin-loading"
            radius="1"
            strokeWidth={9}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}

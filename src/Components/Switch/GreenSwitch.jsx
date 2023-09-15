import React from 'react'
import { Switch } from '@headlessui/react'

function GreenSwitch({
  enabled,
  setEnabled,
  onClick,
  width= 'w-s36',
  height='h-s22',
  toggleButtonWidth="w-s16",
  toggleButtonHeight="h-s16"
}) {
  return (
    <div>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        onClick={onClick}
        className={`${enabled ? 'bg-cPassed' : 'bg-cFailed'
          } relative inline-flex ${width} ${height} items-center rounded-full`}
      >
        <span
          className={`${enabled ? 'translate-x-3.5' : 'translate-x-1'} 
          ${toggleButtonWidth} ${toggleButtonHeight} inline-block transform rounded-full bg-white transition`}
        />

      </Switch>
    </div>
  )
}

export default GreenSwitch

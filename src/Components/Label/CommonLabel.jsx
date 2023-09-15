import React from "react";

export default function CommonLabel({
  labelText = "some label...",
  required = false,
}) {
  return (
    <div className="text-fs14 font-fw600 mb-s15 capitalize w-full text-cHighlighted">
      {labelText}
      {required ? <span className="text-cRed"> *</span> : ""}
    </div>
  );
}

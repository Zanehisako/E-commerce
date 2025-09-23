import { useEffect, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";
interface params {
  value: string | undefined,
  placeholder: string | undefined,
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>
  validate: boolean,
  secureTextEntry?: boolean,
  keyboardType?: KeyboardTypeOptions | undefined
}
export default function InfoTextInput({ value, placeholder, secureTextEntry, setValue, validate, keyboardType }: params) {
  const [borderColor, setBorderColor] = useState<string>()
  useEffect(() => {
    if (validate) {
      if (value === undefined) {
        setBorderColor("red")
      }
    }
  }, [validate])
  return (
    <TextInput secureTextEntry={secureTextEntry} placeholder={placeholder} value={value} onChangeText={setValue} keyboardType={keyboardType} style={{ ...styles.textInput, borderColor: borderColor }
    }></TextInput >
  )
}
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 50,
    fontWeight: "normal",
    fontSize: 12,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#EFF1F3"
  },
})


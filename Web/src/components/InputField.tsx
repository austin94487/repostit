import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    size: _,
    ...props
}) => {
    let InputOrTextarea = Input;
    if (textarea) {
        InputOrTextarea = Textarea as any;
    }
    //special hook from Formik
    const [field, { error }] = useField(props);
    return (
        // !!error casts error string to boolean
        // '' => false
        // 'error message stuff' => true
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
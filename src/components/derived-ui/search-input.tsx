"use client";

import { Field } from "@/components/ui/field";
import { Input, InputProps } from "@chakra-ui/react";
import { RegisterOptions, useFormContext, useWatch } from "react-hook-form";
import { InputGroup } from "@/components/ui/input-group";
import {
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import { getHookFormError } from "@/utils/form";
import { useSearchBox } from "react-instantsearch";

export interface SearchInputProps extends InputProps {
  name: string;
  placeholder: string;
  label?: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  startElement?: ReactNode;
  registerOptions?: RegisterOptions;
  setHasQuery: Dispatch<SetStateAction<boolean>>;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function SearchInput(props, ref) {
    const {
      name,
      placeholder,
      label,
      type,
      startElement,
      registerOptions,
      // setHasQuery is a state setter to let the Hits component about the query state
      // so that based on the state Hits can show or not show its content
      setHasQuery,
      ...rest
    } = props;

    const {
      register,
      formState: { errors },
    } = useFormContext();

    // get the search term for every keystroke
    const searchTerm = useWatch({ name });

    // algolia hook to use apis to search
    const { refine } = useSearchBox();

    useEffect(() => {
      // if there is searchTerm found, search and set hasQuery
      if (searchTerm) {
        refine(searchTerm);
        setHasQuery(true);
      } else {
        setHasQuery(false);
      }
    }, [refine, searchTerm, setHasQuery]);

    return (
      <Field
        label={label}
        invalid={Boolean(getHookFormError(errors, name))}
        errorText={getHookFormError(errors, name)?.message}
      >
        <InputGroup width="100%" startElement={startElement}>
          <Input
            placeholder={placeholder}
            type={type}
            borderRadius="2xl"
            {...rest}
            {...register(name, registerOptions)}
          />
        </InputGroup>
      </Field>
    );
  }
);

export default SearchInput;

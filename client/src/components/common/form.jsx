import { SelectContent } from "@radix-ui/react-select";
import React from "react";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputsByComponentType = (getcontrolItem) => {
    // console.log(getcontrolItem);
    let element = null;
    const value = formData[getcontrolItem.name] || '';
    // console.log(getcontrolItem.name, value);
    switch (getcontrolItem.componentType) {
      case "input":
        element = (
          <Input
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            type={getcontrolItem.type}
            value={value}
            onChange={event => setFormData({
              ...formData,
              [getcontrolItem.name] : event.target.value
            })}
          />
        );
        break;
      case "select":
        element = (
          <Select onValueChange={(value)=>setFormData({
            ...formData,
            [getcontrolItem.name] : value
          })} value={value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getcontrolItem.options && getcontrolItem.options.length > 0
                ? getcontrolItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.id}
            value={value}
            onChange={(event) => setFormData({
              ...formData,
              [getcontrolItem.name]: event.target.value
            })}
          />
        );
        break;

      default:
        element = (
          <Input
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            type={getcontrolItem.type}
            value={value}
            onChange={event => setFormData({
              ...formData,
              [getcontrolItem.name] : event.target.value
            })}
          />
        );
        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label className="mb-1">{controlItem.label}</label>
            {renderInputsByComponentType(controlItem)}
            {/* {console.log(controlItem.label)} */}
          </div>
        ))}
        
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;

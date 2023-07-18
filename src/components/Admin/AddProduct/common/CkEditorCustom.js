import React, { useRef, useImperativeHandle } from "react";
import CKEditor from "react-ckeditor-component";

function CkEditorCustom(props)
{
    const { onReady, onChange, ref, onBlur, name, ...rest } = props;
    const domElementRef = useRef(null);
    const componentRef = useRef(null);
    useImperativeHandle(
        ref,
        () => ({
          focus: () => {
            domElementRef.current?.focus();
          },
          select: () => {
            domElementRef.current?.select();
          },
          set value(val) {
            componentRef.current?.setValue(val);
          },
          get value() {
            return componentRef.current?.getValue();
          },
          type: "formatted-text-box",
          name,
        }),
        [name]
    );
    const handleChange = (value) => {
        if (!onChange) return;
  
        onChange({
          target: {
            name: name,
            value: value,
          },
          type: "change",
        });
      };
  
      const handleBlur = (value) => {
        if (!onBlur) return;
  
        onBlur({
          target: {
            name: name,
            value: value,
          },
          type: "blur",
        });
    };
  
    const handleReady = editor => {
        domElementRef.current = editor.sourceElement;
  
        if (onReady) {
          onReady(editor);
        }
    }

    return (
        <CKEditor
          onReady={handleReady}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={componentRef}
          {...rest}
        />
    )
}

export default CkEditorCustom;
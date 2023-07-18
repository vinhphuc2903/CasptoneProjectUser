import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { TextLabel } from "@findxdn/erp-theme";
function Accessories(props)
{
    const { control, errors = null } = props
    return (
        <div>
            <div>
                <div>
                    <TextLabel>
                        Chip
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: {...rest } }) => (
                            <TextField
                                {...rest}
                                // label='Nhập cân nặng'
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="Chip"
                    />
                    {errors?.Chip?.type === "required" && (
                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập cân nặng sản phẩm! </p>)}
                </div>
                <div>
                    <TextLabel>
                        Ram
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                // label='Nhập cân nặng'
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="Ram"
                    />
                </div>
                <div>
                    <TextLabel>
                        Màn hình
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                // label='Nhập cân nặng'
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="Monitor"
                    />
                </div>
                <div>
                    <TextLabel>
                        Độ phân giải
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="Resolution"
                    />
                </div>
            </div>
        </div>    
    )
}

export default Accessories
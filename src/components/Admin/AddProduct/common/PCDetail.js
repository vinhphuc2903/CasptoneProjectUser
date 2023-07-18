import React from "react";
import { Controller } from "react-hook-form";
import { TextareaAutosize, TextField } from "@mui/material";
import { TextLabel } from "@findxdn/erp-theme";
function PCDetail(props)
{
    const { control, errors = null } = props
    return (
        <div>
            <div>
                <div>
                    <TextLabel>
                        CPU
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
                        name="CPU"
                    />
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
                        name="Monitors"
                    />
                </div>
                <div>
                    <TextLabel>
                        CARD ĐỒ HỌA
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
                        name="Card"
                    />
                </div>
                <div>
                    <TextLabel>
                        Main
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
                        name="Main"
                    />
                </div>
                <div>
                    <TextLabel>
                        Ổ cứng
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
                        name="HardDrive"
                    />
                </div>
                <div>
                    <TextLabel>
                        Nguồn
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
                        name="Source"
                    />
                </div>
            </div>
        </div>    
    )
}

export default PCDetail
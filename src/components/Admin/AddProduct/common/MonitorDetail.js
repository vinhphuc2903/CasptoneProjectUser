import React from "react";
import { Controller } from "react-hook-form";
import { TextareaAutosize, TextField } from "@mui/material";
import { TextLabel } from "@findxdn/erp-theme";
function MonitorDetail(props)
{
    const { control, errors = null } = props
    return (
        <div>
            <div>
                <div>
                    <TextLabel>
                        Kích thước
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
                        name="Size"
                    />
                </div>
                <div>
                    <TextLabel>
                        Tấm nền
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
                        name="Background"
                    />
                </div>
                <div>
                    <TextLabel>
                        Tần số quét
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
                        name="Frequency"
                    />
                </div>
                <div>
                    <TextLabel>
                        Tốc độ phản hồi
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
                        name="Speed"
                    />
                </div>
                <div>
                    <TextLabel>
                        Tỉ lệ
                    </TextLabel>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <TextareaAutosize
                                {...rest}
                                // label='Mô tả '
                                variant="outlined"
                                minRows={5}
                                style={{ width: '400px', paddingLeft: '20px' }}
                            />
                        )}
                        name="Rate"
                    />
                </div>
            </div>
        </div>    
    )
}

export default MonitorDetail
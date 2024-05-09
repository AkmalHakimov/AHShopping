package com.example.demo.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqOrderProduct {
    private Integer productId;
    private Integer amount;
}

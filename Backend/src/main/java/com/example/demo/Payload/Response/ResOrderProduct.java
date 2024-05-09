package com.example.demo.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResOrderProduct {
    private String productName;
    private Integer amount;
    private Integer price;
}

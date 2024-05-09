package com.example.demo.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    private Integer id;
    private UUID userId;
    private String amount;
    private PayType payType;
    private String dateTime;
}

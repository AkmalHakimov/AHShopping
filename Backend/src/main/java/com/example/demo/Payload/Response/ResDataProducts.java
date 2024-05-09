package com.example.demo.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResDataProducts {
    private String productName;
    private String productPrice;
    private Integer countTotalPrepared;
    private Integer countAttendedOrder;
}

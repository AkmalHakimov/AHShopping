package com.example.demo.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResDataUsers {
    private String firstName;
    private String lastName;
    private Integer sumCash;
    private Integer sumPayme;
    private Integer sumClick;
    private Integer countOrder;
    private String lastOrderedDate;
}

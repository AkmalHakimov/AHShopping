package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attachment {
    private UUID id;
    private String prefix;
    private String name;
    public Attachment(UUID id) {
        this.id = id;
    }
}

package com.example.demo.MyController;

import com.example.demo.Db;
import com.example.demo.Entity.Attachment;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
public class FileController {
    @PostMapping("/upload")
    public HttpEntity<?> SavePhoto(@RequestBody MultipartFile file, @RequestParam String prefix) throws IOException, SQLException {
        UUID uuid = Db.SaveAtt(file,prefix);
        FileCopyUtils.copy(file.getInputStream(),new FileOutputStream("files" + prefix + "/" + uuid + ":" + file.getOriginalFilename()));
        return ResponseEntity.ok(uuid);
    }

    @GetMapping("getFile/{id}")
    public void GetFile(@PathVariable String id, HttpServletResponse response) throws SQLException, IOException {
        Attachment attachment = Db.GetFile(id);
        FileCopyUtils.copy(new FileInputStream("files" + attachment.getPrefix() + "/" + attachment.getName()),response.getOutputStream());
    }

    @GetMapping("/size")
    public HttpEntity<?> getFileSize() throws SQLException {
        List<Attachment> attachments = Db.getAttachments();
        List<Attachment> attachmentsPhoto = Db.getAttachmentPhoto();
        List<Attachment> newAtt = new ArrayList<>();
        int count = 0;
        for (Attachment attachment : attachments) {
            for (Attachment attachment1 : attachmentsPhoto) {
                if((attachment.getId().toString().equals(attachment1.getId().toString()))){
                    count++;
                }
            }
            if(count!=1){
                newAtt.add(attachment);
            }
            count=0;
        }
        Integer s = 0;
        for (Attachment attachment : newAtt) {
            File file = new File("Files" + attachment.getPrefix() + "/" + attachment.getName());
            file.length();
            s = (int) (s +file.length());
        }
        return ResponseEntity.ok(s/1024);
    }

    @DeleteMapping
    public HttpEntity<?> DelFile() throws SQLException {
        List<Attachment> attachments = Db.getAttachments();
        List<Attachment> attachmentsPhoto = Db.getAttachmentPhoto();
        List<Attachment> newAtt = new ArrayList<>();
        int count = 0;
        for (Attachment attachment : attachments) {
            for (Attachment attachment1 : attachmentsPhoto) {
                if((attachment.getId().toString().equals(attachment1.getId().toString()))){
                    count++;
                }
            }
            if(count!=1){
                newAtt.add(attachment);
            }
            count=0;
        }
        for (Attachment attachment : newAtt) {
            int i = attachment.getName().indexOf(":");
            File file = new File("Files" + attachment.getPrefix() + "/" + attachment.getId());
            file.delete();
        }
        Db.DelRedunDantFile(newAtt);
        return ResponseEntity.ok("");
    }
}

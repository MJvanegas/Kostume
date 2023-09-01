package com.kustoms.dto;

import com.kustoms.models.Photo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;


@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PhotoResponse {
    private Long id;
    private String url;

    // Constructor, getters y setters

    public static PhotoResponse fromEntity(Photo photo) {
        PhotoResponse dto = new PhotoResponse();
        dto.setId(photo.getId());
        dto.setUrl(photo.getUrl());
        return dto;
    }
}

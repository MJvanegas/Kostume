package com.kustoms.dto;

import com.kustoms.models.Category;
import com.kustoms.models.Characteristic;
import com.kustoms.models.Reference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReferenceResponse {
        private Long id;
        private String name;
        private String detail;
        private List<PhotoResponse> photos;
        private List<Category> categories;
        private List<Characteristic> characteristics;
        private String status;

        // Constructor, getters y setters

        public static ReferenceResponse fromEntity(Reference reference) {
            ReferenceResponse dto = new ReferenceResponse();
            dto.setId(reference.getId());
            dto.setName(reference.getName());
            return dto;
        }
}



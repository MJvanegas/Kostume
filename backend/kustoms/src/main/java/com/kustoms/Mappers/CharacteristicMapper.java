package com.kustoms.Mappers;

import com.kustoms.dto.CharacteristicResponse;
import com.kustoms.models.Characteristic;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Value;


@Mapper(componentModel = "spring")
public interface CharacteristicMapper {

    @Value("${server.port}")
     Integer port = 8080;
    CharacteristicMapper INSTANCE = Mappers.getMapper(CharacteristicMapper.class);

    @Mapping(target = "icon", expression = "java(getIconUrl(characteristic.getIcon()))")
    CharacteristicResponse toResponse(Characteristic characteristic);

    default String getIconUrl(String icon) {
        return "http://localhost:" + port + "/img/" + icon;
    }

}

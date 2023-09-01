package com.kustoms.constants;

public enum CustomStatus {
    ACTIVE("active"),
    INCATIVEWHITHOUTPHOTOS("Inactive whith out phostos"),
    INACTIVE("Inactive"),
    DISMISSED("Dismissed");

    private final String value;

    CustomStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

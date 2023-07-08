import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <TouchableOpacity
            key={i}
            onPress={() => handlePageChange(i)}
            style={{
              backgroundColor: currentPage === i ? "#2F2E41" : "#fff",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
              marginRight: 8,
            }}
          >
            <Text style={{ color: currentPage === i ? "#fff" : "#2F2E41" }}>
              {i}
            </Text>
          </TouchableOpacity>
        );
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(
            <TouchableOpacity
              key={i}
              onPress={() => handlePageChange(i)}
              style={{
                backgroundColor: currentPage === i ? "#2F2E41" : "#fff",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                marginRight: 8,
              }}
            >
              <Text style={{ color: currentPage === i ? "#fff" : "#2F2E41" }}>
                {i}
              </Text>
            </TouchableOpacity>
          );
        }
        pageNumbers.push(
          <Text
            key="ellipsis-end"
            style={{ paddingHorizontal: 4, color: "#2F2E41" }}
          >
            ...
          </Text>
        );
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(
          <Text
            key="ellipsis-start"
            style={{ paddingHorizontal: 4, color: "#2F2E41" }}
          >
            ...
          </Text>
        );
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(
            <TouchableOpacity
              key={i}
              onPress={() => handlePageChange(i)}
              style={{
                backgroundColor: currentPage === i ? "#2F2E41" : "#fff",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                marginRight: 8,
              }}
            >
              <Text style={{ color: currentPage === i ? "#fff" : "#2F2E41" }}>
                {i}
              </Text>
            </TouchableOpacity>
          );
        }
      } else {
        pageNumbers.push(
          <Text
            key="ellipsis-start"
            style={{ paddingHorizontal: 4, color: "#2F2E41" }}
          >
            ...
          </Text>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <TouchableOpacity
              key={i}
              onPress={() => handlePageChange(i)}
              style={{
                backgroundColor: currentPage === i ? "#2F2E41" : "#fff",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                marginRight: 8,
              }}
            >
              <Text style={{ color: currentPage === i ? "#fff" : "#2F2E41" }}>
                {i}
              </Text>
            </TouchableOpacity>
          );
        }
        pageNumbers.push(
          <Text
            key="ellipsis-end"
            style={{ paddingHorizontal: 4, color: "#2F2E41" }}
          >
            ...
          </Text>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <View
      style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}
    >
      <TouchableOpacity
        onPress={() => handlePageChange(1)}
        disabled={currentPage === 1}
        style={{ marginRight: 8 }}
      >
        <IconButton icon="chevron-double-left" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ marginRight: 8 }}
      >
        <IconButton icon="chevron-left" size={24} />
      </TouchableOpacity>
      {renderPageNumbers()}
      <TouchableOpacity
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ marginLeft: 8 }}
      >
        <IconButton icon="chevron-right" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{ marginLeft: 8 }}
      >
        <IconButton icon="chevron-double-right" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

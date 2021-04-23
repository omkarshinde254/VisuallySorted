import random

def random_number_generator(length):
    l_list_randomarray = list()
    for value in range(0,length):
        l_list_randomarray.append(random.randint(1, 99))
    return (l_list_randomarray)


def swap(a,b,swap_list):
    #print("Swapping")
    swap_list[a], swap_list[b] = swap_list[b], swap_list[a]

def selection_sort(array):
    return_list = list()
    print("Selection Sorting !")
    print("Array is -> ",array)

    for i in range(len(array)):
        return_list.append(list(array))
        min_idx = i
        for j in range(i,len(array)):
            #print("Checking for ",array[min_idx],array[j])
            if array[j] < array[min_idx]:
                swap(j, min_idx, array)

    return return_list


# Call Algos
#random_number_generator(10)
#print(selection_sort(random_number_generator(30)))
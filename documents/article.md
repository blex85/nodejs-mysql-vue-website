# �ӿ�ǰ׺
	http://localhost:8088/api
## ���½ӿ�
--------------
### ��������
	POST   /article/create
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| type | ���� | 0��1��0��ʾ��ͨ���£�1��ʾ�������� | ��Ĭ��Ϊ0 |
| title | �ַ��� | ���� | �� |
| author | �ַ��� | ���� | �� |
| tag | �ַ��� | ��ǩ | �� |
| description | �ַ��� | ���� | �� |
| content | �ַ��� | ���� | �� |
| cover | �ַ��� | ���� | �� |

### �ɹ�����
	{
      "msg": "��ӳɹ�",
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
### ��ȡ�����б�
	GET   /article/list
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| page | ���� | ҳ�� | ��Ĭ��Ϊ��һҳ |

### �ɹ�����
	{
	    "data": [
	        {
	            "created_at": "2019-11-14",
	            "type": 0,
	            "title": "qqq",
	            "author": null,
	            "tag": "qqq",
	            "cover": "pictures/2019-11-19/1574153153894_bd_logo1.png",
	            "description": "qqqq",
	            "browse": 9,
	            "total_char": 5,
	            "article_id": 99970366
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "sgaga",
	            "author": null,
	            "tag": "fwagw",
	            "cover": "pictures/2019-11-19/1574165764461_ad.jpg",
	            "description": "sagae",
	            "browse": 16,
	            "total_char": 24,
	            "article_id": 56537094
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "wsegweaga",
	            "author": null,
	            "tag": "sgeawgweag",
	            "cover": "pictures/2019-11-19/1574165777365_lk_logo_big.png",
	            "description": "ewageahgae",
	            "browse": 4,
	            "total_char": 12,
	            "article_id": 54065405
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "sgaw",
	            "author": null,
	            "tag": "asfasG",
	            "cover": "pictures/2019-11-20/1574237528016_slide_03_2000x410.jpg",
	            "description": "swgawegh",
	            "browse": 7,
	            "total_char": 12,
	            "article_id": 54042754
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "awega",
	            "author": null,
	            "tag": "wag",
	            "cover": "pictures/2019-11-20/1574237538272_i_r6_c6.png",
	            "description": "watawtyatya",
	            "browse": 3,
	            "total_char": 9,
	            "article_id": 44344880
	        }
	    ],
	    "meta": {
	        "count": 21,
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
--------------
### ��ȡ��ƪ��������
	GET   /article/detail/:id
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| ---- | ---- | --- |----|
| :id | ���� | ����id | �� |

### �ɹ�����
	{
	    "data": {
	        "created_at": "2019-10-19",
	        "updated_at": "2019-10-19",
	        "id": 1,
	        "title": "2h",
	        "author": "pum",
	        "tag": "r2",
	        "content": "<p>2222��f</p>",
	        "cover": "sfss",
	        "browse": 588,
	        "total_char": 52,
	        "article_id": 1
	    },
	    "success": true
	}	
### ʧ�ܷ���
	{
	    "msg": "����Ϊ��",
	    "errCode": 40004,
	    "code": 404,
	    "success": false
	}
--------------
### ɾ����ƪ����
	DELETE  /article/delete/:id
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| :id | ���� | ����id | �� |


### �ɹ�����
	{
      "msg": "ɾ���ɹ�",
      "success": true
	}	
### ʧ�ܷ���
	{
      "msg": "����Ϊ��",
      "errCode": 40000,
      "code": 400,
      "success": false
	}

--------------
### ���µ�ƪ����
	PUT  /article/update/:id
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| :id | ���� | ����id | �� |

### �ɹ�����
	{
      "msg": "���³ɹ�",
      "success": true
	}	
### ʧ�ܷ���
	{
      "msg": "����Ϊ��",
      "errCode": 40000,
      "code": 400,
      "success": false
	}

## �������½ӿ�
--------------
### ���������б�
	GET   /article/blog
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| page | ���� | ҳ�� | ��Ĭ��Ϊ��һҳ |

### �ɹ�����
	{
	    "data": [
	        {
	            "created_at": "2019-11-14",
	            "type": 0,
	            "title": "qqq",
	            "author": null,
	            "tag": "qqq",
	            "cover": "pictures/2019-11-19/1574153153894_bd_logo1.png",
	            "description": "qqqq",
	            "browse": 9,
	            "total_char": 5,
	            "article_id": 99970366
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "sgaga",
	            "author": null,
	            "tag": "fwagw",
	            "cover": "pictures/2019-11-19/1574165764461_ad.jpg",
	            "description": "sagae",
	            "browse": 16,
	            "total_char": 24,
	            "article_id": 56537094
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "wsegweaga",
	            "author": null,
	            "tag": "sgeawgweag",
	            "cover": "pictures/2019-11-19/1574165777365_lk_logo_big.png",
	            "description": "ewageahgae",
	            "browse": 4,
	            "total_char": 12,
	            "article_id": 54065405
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "sgaw",
	            "author": null,
	            "tag": "asfasG",
	            "cover": "pictures/2019-11-20/1574237528016_slide_03_2000x410.jpg",
	            "description": "swgawegh",
	            "browse": 7,
	            "total_char": 12,
	            "article_id": 54042754
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "awega",
	            "author": null,
	            "tag": "wag",
	            "cover": "pictures/2019-11-20/1574237538272_i_r6_c6.png",
	            "description": "watawtyatya",
	            "browse": 3,
	            "total_char": 9,
	            "article_id": 44344880
	        }
	    ],
	    "meta": {
	        "count": 21,
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